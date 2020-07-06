class Region {
  constructor(length) {
    this.grid = []
    for (var i=0; i<length; i++) {
      this.grid.push(0)
    }
    this.cells = []
  }

  clone() {
    var clone = new Region(this.grid.length)
    this.grid = this.grid.slice()
    this.cells = this.cells.slice()
    return clone
  }

  _mod(val) {
    var mod = this.grid.length
    return ((val % mod) + mod) % mod
  }

  getCell(x, y) {
    return ((this.grid[x] & (1 << y)) !== 0)
  }

  setCell(x, y) {
    x = this._mod(x)
    if (this.getCell(x, y)) return
    this.grid[x] |= (1 << y)
    this.cells.push({'x':x, 'y':y})
  }

  merge(other) {
    this.cells = this.cells.concat(other.cells)
    for (var i=0; i<this.grid.length; i++) {
      this.grid[i] += other.grid[i]
    }
  }
}

// A 2x2 grid is internally a 5x5:
// corner, edge, corner, edge, corner
// edge,   cell, edge,   cell, edge
// corner, edge, corner, edge, corner
// edge,   cell, edge,   cell, edge
// corner, edge, corner, edge, corner
//
// Corners and edges will have a value of true if the line passes through them
// Cells will contain an object if there is an element in them
class Puzzle {
  constructor(width, height, pillar=false) {
    if (pillar === true) {
      this.newGrid(2 * width, 2 * height + 1)
    } else {
      this.newGrid(2 * width + 1, 2 * height + 1)
    }
    this.width = this.grid.length
    this.height = this.grid[0].length
    this.regionCache = {}
    this.pillar = pillar
  }

  static deserialize(json) {
    var parsed = JSON.parse(json)
    // Claim that it's not a pillar (for consistent grid sizing), then double-check ourselves later.
    var puzzle = new Puzzle((parsed.grid.length - 1)/2, (parsed.grid[0].length - 1)/2)
    puzzle.name = parsed.name
    puzzle.autoSolved = parsed.autoSolved
    puzzle.grid = parsed.grid
    // @Legacy: Grid squares used to use 'false' to indicate emptiness.
    // @Legacy: Cells used to use undefined to indicate emptiness. (... I think this still happens for intermediates)
    // @Legacy: Lines used to use 'line' instead of 'color'
    // Now, we use:
    // Cells default to {}
    // Lines default to {'type':'line', 'line':0}
    for (var x=0; x<puzzle.width; x++) {
      for (var y=0; y<puzzle.height; y++) {
        var cell = puzzle.grid[x][y]
        if (cell === false || cell == undefined) {
          if (x%2 === 1 && y%2 === 1) puzzle.grid[x][y] = {}
          else puzzle.grid[x][y] = {'type':'line', 'line':window.LINE_NONE}
        } else {
          if ((cell.type === 'poly' || cell.type === 'ylop') && cell.rot === 'all') {
            // @Legacy: Polys and ylops used to have a rot value (before I started using polyshape).
            // rot=all is a holdover that was used to represent rotation polyominos.
            puzzle.grid[x][y].polyshape |= window.ROTATION_BIT
            puzzle.grid[x][y].rot = undefined
          } else if (cell.gap === true) {
            // @Legacy: Gaps used to be undefined/true, are now undefined/1/2
            puzzle.grid[x][y].gap = 1
          }
        }
      }
    }
    // @Legacy: Startpoints used to be only parsed.start
    if (parsed.start) {
      parsed.startPoints = [parsed.start]
    }
    // @Legacy: Startpoints used to be a separate array, now they are flags
    if (parsed.startPoints) {
      for (var startPoint of parsed.startPoints) {
        puzzle.grid[startPoint.x][startPoint.y].start = true
      }
    }
    // @Legacy: Endpoints used to be only parsed.end
    if (parsed.end) {
      parsed.endPoints = [parsed.end]
    }
    // @Legacy: Endpoints used to be a separate array, now they are flags
    if (parsed.endPoints) {
      for (var endPoint of parsed.endPoints) {
        puzzle.grid[endPoint.x][endPoint.y].end = endPoint.dir
      }
    }
    // @Legacy: Dots and gaps used to be separate arrays
    // Now, they are flags on the individual lines.
    if (parsed.dots) {
      for (var dot of parsed.dots) {
        puzzle.grid[dot.x][dot.y].dot = 1
      }
    }
    if (parsed.gaps) {
      for (var gap of parsed.gaps) {
        puzzle.grid[gap.x][gap.y].gap = 1
      }
    }
    if (parsed.regionCache != undefined) puzzle.regionCache = parsed.regionCache
    puzzle.pillar = parsed.pillar
    puzzle.symmetry = parsed.symmetry
    puzzle.largezero = puzzle.width * puzzle.height
    return puzzle
  }

  serialize() {
    return JSON.stringify(this)
  }

  clone() {
    // This is just not that expensive.
    return Puzzle.deserialize(this.serialize())
  }

  // This is explicitly *not* just clearing the grid, so that external references
  // to the grid are not also cleared.
  newGrid(width, height) {
    if (width == undefined) { // Called by someone who just wants to clear the grid.
      width = this.width
      height = this.height
    }
    this.grid = []
    for (var x=0; x<width; x++) {
      this.grid[x] = []
      for (var y=0; y<height; y++) {
        if (x%2 === 1 && y%2 === 1) this.grid[x][y] = {}
        else this.grid[x][y] = {'type':'line', 'line':LINE_NONE}
      }
    }
    // Performance: A large value which is === 0 to be used for pillar wrapping.
    this.largezero = width * height * 2
  }

  // Wrap a value around at the width of the grid. No-op if not in pillar mode.
  _mod(val) {
    if (this.pillar === false) return val
    return (val + this.largezero) % this.width
  }

  // Determine if an x, y pair is a safe reference inside the grid. This should be invoked at the start of every
  // function, but then functions can access the grid directly.
  _safeCell(x, y) {
    if (x < 0 || x >= this.width) return false
    if (y < 0 || y >= this.height) return false
    return true
  }

  getCell(x, y) {
    x = this._mod(x)
    if (!this._safeCell(x, y)) return undefined
    return this.grid[x][y]
  }

  setCell(x, y, value) {
    x = this._mod(x)
    if (!this._safeCell(x, y)) return
    this.grid[x][y] = value
  }

  getSymmetricalDir(dir) {
    if (this.symmetry != undefined) {
      if (this.symmetry.x === true) {
        if (dir === 'left') return 'right'
        if (dir === 'right') return 'left'
      }
      if (this.symmetry.y === true) {
        if (dir === 'top') return 'bottom'
        if (dir === 'bottom') return 'top'
      }
    }
    return dir
  }

  // @Cleanup: Avoid duplicating x symmetry?
  getSymmetricalPos(x, y) {
    if (this.symmetry != undefined) {
      if (this.pillar === true) {
        x += this.width/2
        if (this.symmetry.x === true) {
          x = this.width - x
        }
      } else {
        if (this.symmetry.x === true) {
          x = (this.width - 1) - x
        }
      }
      if (this.symmetry.y === true) {
        y = (this.height - 1) - y
      }
    }
    return {'x':this._mod(x), 'y':y}
  }

  getSymmetricalCell(x, y) {
    var pos = this.getSymmetricalPos(x, y)
    return this.getCell(pos.x, pos.y)
  }

  // A variant of getCell which specifically returns line values,
  // and treats objects as being out-of-bounds
  getLine(x, y) {
    var cell = this.getCell(x, y)
    if (cell == undefined) return undefined
    if (cell.type !== 'line') return undefined
    return cell.line
  }

  updateCell2(x, y, key, value) {
    x = this._mod(x)
    if (!this._safeCell(x, y)) return
    assert(this.grid[x][y] != undefined)
    if (this.grid[x][y] == undefined) {
      this.grid[x][y] = {[key]: value}
    } else {
      this.grid[x][y][key] = value
    }
  }

  getValidEndDirs(x, y) {
    x = this._mod(x)
    if (!this._safeCell(x, y)) return []

    var dirs = []
    var leftCell = this.getCell(x - 1, y)
    if (leftCell == undefined || leftCell.gap === 2) dirs.push('left')
    var topCell = this.getCell(x, y - 1)
    if (topCell == undefined || topCell.gap === 2) dirs.push('top')
    var rightCell = this.getCell(x + 1, y)
    if (rightCell == undefined || rightCell.gap === 2) dirs.push('right')
    var bottomCell = this.getCell(x, y + 1)
    if (bottomCell == undefined || bottomCell.gap === 2) dirs.push('bottom')
    return dirs
  }

  // Called on a solution. Computes a list of gaps to show as hints which *do not*
  // break the path.
  loadHints() {
    this.hints = []
    for (var x=0; x<this.width; x++) {
      for (var y=0; y<this.height; y++) {
        if (x%2 + y%2 === 1 && this.getLine(x, y) > window.LINE_NONE) {
          this.hints.push({'x':x, 'y':y})
        }
      }
    }
  }

  // Show a hint on the grid.
  // If no hint is provided, will select the best one it can find,
  // prioritizing breaking current lines on the grid.
  // Returns the shown hint.
  showHint(hint) {
    if (hint != undefined) {
      this.grid[hint.x][hint.y].gap = 1
      return
    }

    var goodHints = []
    var badHints = []

    for (var hint of this.hints) {
      if (this.getLine(hint.x, hint.y) > window.LINE_NONE) {
        // Solution will be broken by this hint
        goodHints.push(hint)
      } else {
        badHints.push(hint)
      }
    }
    if (goodHints.length > 0) {
      var hint = goodHints.splice(window.randInt(goodHints.length), 1)[0]
    } else if (badHints.length > 0) {
      var hint = badHints.splice(window.randInt(badHints.length), 1)[0]
    } else {
      return
    }
    this.grid[hint.x][hint.y].gap = 1
    this.hints = badHints.concat(goodHints)
    return hint
  }

  clearLines() {
    for (var x=0; x<this.width; x++) {
      for (var y=0; y<this.height; y++) {
        if (x%2 === 1 && y%2 === 1) continue
        this.grid[x][y].line = 0
        this.grid[x][y].dir = undefined
      }
    }
  }

  // The grid contains 4 colors:
  // undefined: Out of bounds or already processed
  // 0: In bounds, awaiting processing, but should not be part of the final region.
  // 1: In bounds, awaiting processing
  // 2: Gap-2, but not out of bounds so should be treated normally
  _floodFill(x, y, region) {
    x = this._mod(x)
    if (!this._safeCell(x, y)) return
    var cell = this.grid[x][y]
    if (cell === undefined) return
    if (cell !== 0) {
      region.setCell(x, y)
    }
    this.grid[x][y] = undefined

    // @Performance: Why is this ordered TLBR?
    this._floodFill(x, y + 1, region)
    this._floodFill(x + 1, y, region)
    this._floodFill(x, y - 1, region)
    this._floodFill(x - 1, y, region)
  }

  // Re-uses the same grid, but only called on edges which border the outside
  // Called first to mark cells that are connected to the outside, i.e. should not be part of any region.
  _floodFillOutside(x, y) {
    x = this._mod(x)
    if (!this._safeCell(x, y)) return
    var cell = this.grid[x][y]
    if (cell === undefined) return
    if (x%2 !== y%2 && cell !== 2) return // Only flood-fill through gap-2
    this.grid[x][y] = undefined

    // @Performance: Why is this ordered TLBR?
    this._floodFillOutside(x, y + 1)
    this._floodFillOutside(x + 1, y)
    this._floodFillOutside(x, y - 1)
    this._floodFillOutside(x - 1, y)
  }

  // Returns the original grid (pre-masking). You will need to switch back once you are done flood filling.
  _switchToMaskedGrid() {
    // Make a copy of the grid -- we will be overwriting it
    var savedGrid = this.grid
    this.grid = []
    // Override all elements with empty lines -- this means that flood fill is just
    // looking for lines with line=0.
    for (var x=0; x<this.width; x++) {
      this.grid[x] = []
      for (var y=0; y<this.height; y++) {
        var cell = savedGrid[x][y]
        // Optimization: Different code for cells/lines?
        if (cell != undefined && cell.line > window.LINE_NONE) {
          if (x%2 !== y%2 && (cell.start === true || cell.end != undefined)) {
            // Traced lines which are mid-segment start or end points should not separate the region
            this.grid[x][y] = 0
          } else {
            // Traced lines should not be a part of the region
            this.grid[x][y] = undefined
          }
        } else if (cell != undefined && cell.gap === 2) {
          this.grid[x][y] = 2
        } else {
          // Indicates that this cell will be a part of the region
          this.grid[x][y] = 1
        }
      }
    }

    // Mark all outside cells as 'not in any region' (aka undefined)

    if (this.pillar === false) {
      // Left and right edges (only applies to non-pillars)
      for (var y=1; y<this.height; y+=2) {
        this._floodFillOutside(0, y)
        this._floodFillOutside(this.width - 1, y)
      }
    }

    // Top and bottom edges
    for (var x=1; x<this.width; x+=2) {
      this._floodFillOutside(x, 0)
      this._floodFillOutside(x, this.height - 1)
    }

    return savedGrid
  }

  getRegions() {
    var regions = []
    var savedGrid = this._switchToMaskedGrid()

    for (var x=0; x<this.width; x++) {
      for (var y=0; y<this.height; y++) {
        if (this.grid[x][y] == undefined) continue

        // If this cell is empty (aka hasn't already been used by a region), then create a new one
        // This will also mark all lines inside the new region as used.
        var region = new Region(this.width)
        this._floodFill(x, y, region)
        regions.push(region)
      }
    }
    this.grid = savedGrid
    return regions
  }

  getRegion(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return null

    var savedGrid = this._switchToMaskedGrid()
    if (this.grid[x][y] == undefined) {
      this.grid = savedGrid
      return null
    }

    // If the masked grid hasn't been used at this point, then create a new region.
    // This will also mark all lines inside the new region as used.
    var region = new Region(this.width)
    this._floodFill(x, y, region)

    this.grid = savedGrid
    return region
  }

  logGrid() {
    var output = ''
    for (var y=0; y<this.height; y++) {
      for (var x=0; x<this.width; x++) {
        var cell = this.getCell(x, y)
        if (cell == undefined) output += '?'
        else if (cell.start === true) output += 'S'
        else if (cell.end != null) output += 'E'
        else if (cell.type === 'line') output += cell.line
        else output += '#'
      }
      output += '\n'
    }
    console.info(output)
  }
}
