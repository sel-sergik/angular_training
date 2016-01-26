'use strict';

//define scope, add arrays watchers, async tasks, postdigest tasks and current phase
function Myscope() {
	this.$$arrayWatchers = [];
	this.$$arrayAsyncTask = [];
	this.$$arrayPostDigestTast = [];
	this.$$phase = null;
}

//implement watch function
Myscope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
	var self = this;
	var watcher = {
		watchFunction: watchFn,
		listenerFunction: listenerFn || function() { },
		valueEqual: !!valueEq
	};

	this.$$arrayWatchers.push(watcher);
	//disable watching function
	return function() {
		var index = self.$$arrayWatchers.indexOf(watcher);
		if (index >= 0) {
			self.$$arrayWatchers.splice(index, 1);
		}
	};
};

// implement digestOnce function. this function show the changes were or not
Myscope.prototype.$$digestOnce = function() {
	var self = this;
	var unequal;
	_.forEach(this.$$arrayWatchers, function(watch) {
		try {
			var newVal = watch.watchFunction(self);
			var oldVal = watch.last;
			if (!self.$$isEqual(newVal, oldVal, watch.valueEqual)) {
				watch.listenerFunction(newVal, oldVal, self);
				unequal = true;
			}
			watch.last = (watch.valueEqual ? _.cloneDeep(newVal) : newVal);
		} catch (e) {
			console.log(e);
		}
	});
	return unequal;
};

//implement digest function, that run all watchers
Myscope.prototype.$digest = function() {
	var unequal;
	var limit = 10; //set limit on 50 iteration
	this.$setPhase("$digest");
	do {
		while (this.$$arrayAsyncTask.length) {
			try {
				var asyncTask = this.$$arrayAsyncTask.shift();
				this.$eval(asyncTask.expression);
			} catch (e) {
				console.log(e);
			}
		}
		unequal = this.$$digestOnce();
		if (unequal && !(limit--)) {
			this.$clearPhase();
			throw "50 digest iterations. Error";
		}
	} while (unequal);
	this.$clearPhase();
	while (this.$$arrayPostDigestTast.length) {
		try {
			this.$$arrayPostDigestTast.shift()();
		} catch (e) {
			console.log(e);
		}
	}
};

//add verification "by value"
Myscope.prototype.$$isEqual = function(newVal, oldVal, valueEq) {
	if (valueEq) {
		return _.isEqual(newVal, oldVal);
	}
	else {
		return newVal === oldVal || (typeof newVal === 'number' && typeof oldVal === 'number' && isNaN(newVal) && isNaN(oldVal));
	}
};

// function that execute code in context of the scope
Myscope.prototype.$eval = function(currFunc, locals) {
	return currFunc(this, locals);
};

//implement apply function. this function call function, sent as a parameter, and finally run digest
Myscope.prototype.$apply = function(expr) {
	try {
		this.$setPhase("$apply");
		return this.$eval(expr);
	} finally {
		this.$clearPhase();
		this.$digest();
	}
};

// implement function for deferred execution
Myscope.prototype.$evalAsync = function(expr) {
	var self = this;
	if (!self.$$phase && !self.$$arrayAsyncTask.length) {
		setTimeout(function() {
			if (self.$$arrayAsyncTask.length) {
				self.$digest();
			}
		}, 0);
	}
	this.$$arrayAsyncTask.push({scope: this, expression: expr});
};

// set phase function
Myscope.prototype.$setPhase = function(phase) {
	if (this.$$phase) {
		throw "Now work phase " + this.$$phase;
	}
	this.$$phase = phase;
};

// clear phase function
Myscope.prototype.$clearPhase = function() {
	this.$$phase = null;
};

Myscope.prototype.$$postDigest = function(expressionFunction) {
  this.$$arrayPostDigestTast.push(expressionFunction);
};

var newScope = new Myscope();

// Here's present code that displays the work each of the functions. Uncomment the necessary code to check

// This code show the work functions $watch and $digest
	// newScope.name = "Siarhei";
	// newScope.counterChangesforName = 0;
	// newScope.$watch(
	//   function(scope) {
	//   	return scope.name;
	//   },
	//   function(newValue, oldValue, scope) {
	//   	scope.counterChangesforName++; 
	//   }
	// );

	// newScope.$digest();
	// console.log("value for counter after first start digest: " + newScope.counterChangesforName);
	// newScope.$digest();
	// newScope.$digest();
	// newScope.$digest();
	// console.log("when name not change then digest not run listenerFunction, value of counter is old: " + newScope.counterChangesforName);
	// newScope.name = "Ivan";
	// newScope.$digest();
	// console.log("when name change then digest run listenerFunction for watcher, value of counter increased: " + newScope.counterChangesforName);

// This code show the work function apply
	// newScope.counter = 0;

	// newScope.$watch(
	//   function(scope) {
	//     return scope.messageToCheck;
	//   },
	//   function(newValue, oldValue, scope) {
	//     scope.counter++;
	//   }
	// );

	// console.log("at the start property messageToCheck is " + newScope.messageToCheck + " and counter for changes is " + newScope.counter);
	// newScope.$apply(function(scope) {
	//   scope.messageToCheck = 'we changed value';
	// });
	// console.log("after run apply function property messageToCheck is '" + newScope.messageToCheck + "' and counter for changes is " + newScope.counter);

// This code show the work async queue
	// newScope.asyncVal = false;

	// newScope.$watch(
	//   function(scope) {
	//     return scope.testValue;
	//   },
	//   function(newValue, oldValue, scope) {
	//     scope.$evalAsync(function(scope) {
	//       scope.asyncVal = true;
	//     });
	//     console.log("Value property 'asyncVal' inside listener: "+scope.asyncVal);
	//   }
	// );

	// newScope.testValue = "test";
	// newScope.$digest();
	// console.log("Value property 'asyncVal' after digest: "+newScope.asyncVal); 

// This code show the work postDigest function
	// var postVal = false;

	// newScope.$$postDigest(function() {
	//   postVal = true;
	// });

	// console.log("postVal before digest: " + postVal);
	// newScope.$digest();
	// console.log("postVal after digest: " + postVal);