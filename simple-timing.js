/**
 *  simple-timing
 *  IzayoiH 2017.11
 */

(function (window) {
  // Get Performance API
  var performance = window.performance ||
                       window.webkitPerformance ||
                       window.msPerformance ||
                       window.mozPerformance
  if (performance === void 0) {
    console.error('Error: Your browser does not support Performace API.')
    return false
  }
  var timing = performance.timing

  // Default timing
  var times = {}
  
  var sTiming = {
    /**
     * Get times
     */
    getTimes : function () {
      // Total time from start to load event end
      times.loadTime = timing.loadEventEnd - timing.navigationStart
      // Time to First Byte
      times.firstByteTime = timing.responseStart - timing.navigationStart
      // Redirection time
      times.redirectTime = timing.redirectEnd - timing.redirectStart
      // Cache time
      times.appCacheTime = timing.domainLookupStart - timing.fetchStart
      // DNS time
      times.domainLookupTime = timing.domainLookupEnd - timing.domainLookupStart
      // Connection time (TCP)
      times.connectTime = timing.connectEnd - timing.connectStart
      // Request time
      times.requestTime = timing.responseEnd - timing.requestStart
      // The time it takes to construct the DOM tree
      times.domReadyTime = timing.domComplete - timing.domLoading
      // Time spent on load event
      times.loadEventTime = timing.loadEventEnd - timing.loadEventStart
      // Time spent on unload event
      times.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart
    },
    /**
     * Add custom pefromance timing
     * @param {string} name
     * @param {string} end
     * @param {string} start
     */
    addTiming: function (name, end, start) {
      try {
        var error = []
        if (timing[end] === void 0) error.push(end)
        if (timing[start] === void 0) error.push(start)
        if (error.length === 0) {
          times[name] = timing[end] - timing[start]
        } else {
          throw error
        }
      } catch (e) {
        console.error('Error: Properties : "' + e.join(', ') + '" do not exist.')
      }
    },
    /**
     * Print performance timing
     * It will return all timing without params
     * Format of params can be a array or strings，or combination.
     * (string, string, ....) / (array) / (string, array, string, ....)
     */
    print: function () {
      this.getTimes()
      var names = [], table = {}
      if (arguments.length !== 0) {
        var args = Array.prototype.slice.call(arguments)
        args = unique(flatten(args))
        try {
          var error = []
          args.forEach(function (val) {
            if (times[val] === void 0) {
              error.push(val)
            } else {
              names.push(val)
            }
            if (error.length !== 0) throw error
          })
        } catch (e) {
          console.error('Error: Timing : "' + e.join(', ') + '" do not exist.')
        }
      } else {
        names = Object.keys(times).sort()
      }
      names.forEach(function (val) {
        table[val] = {
          ms: times[val],
          s: +(times[val] / 1000).toFixed(3)
        }
      })
      console.table(table)
    }
  }

  /**
   * Flatten an array
   * @param {array} arr
   * @return {array}
   */
  function flatten (arr) {
    var result = []
    arr.forEach(function (val) {
      if (Array.isArray(val)) {
        result = result.concat(flatten(val))
      } else {
        result.push(val)
      }
    })
    return result
  }

  /**
   * Return an array with no repeating elements.
   * @param {Array} arr
   */
  function unique (arr) {
    var obj = {}
    var result = []
    arr.forEach(function (val) {
      if (obj[val] === void 0) {
        obj[val] = 1
        result.push(val)
      }
    })
    return result
  }

  window.sTiming = sTiming
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.sTiming
  }

})(window || {})
