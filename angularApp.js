function Data(type,input,read) {
	this.type=type;
	this.data=input;
	this.read=read;
}

function List(head) {
	this.data=[];
	this.add= function (type,x,read) {
		this.data.push(new Data(type,x,read));
	};
};

var nav = angular.module("Navbar",[]);

nav.controller("bi",function ($scope,$element) {
	$scope.title="Welcome to To-do-List Site";
});

var content= angular.module("Content",[]);

content.controller('data',function ($scope, $element, $compile,$timeout) {

	$scope.init=function (x) {
		if(x.type=='H'){
			$scope.disable_input = function(keyEvent) {
			  	if (keyEvent.which === 13){
			  		angular.element($element.children()[0]).css("display","inherit");
					angular.element($element.children()[1]).css("display","none");
			  	}
			}
			$scope.edit_heading=function () {
				if(test){
					angular.element($element.children()[0]).css("display","none");
					angular.element($element.children()[1]).css("display","inherit");
				}
			}
			var mouseDown=false;
			$element.bind('mousedown',function () {
				mouseDown=true;
				$timeout(function () {
					if(mouseDown&&!test){
						var index=$scope.$parent.$parent.$parent.$parent.list2.indexOf($scope.$parent.$parent.x);
						$scope.$parent.$parent.$parent.$parent.list2.splice(index,1);
						mouseDown=false;
					}
				},2000);
			});
			$element.empty();
			$element.append("<span class='heading' ng-bind='x.data' ng-dblclick='edit_heading()'></span><input type='text' class='input heading' ng-keypress='disable_input($event)'ng-model='x.data'>")
			$element.addClass("heading");
			$compile($element.contents())($scope);
		}
		if(x.type=="D"){
			$scope.disable_input = function(keyEvent) {
			  	if (keyEvent.which === 13){
			  		$scope.save();
			  		$scope.visibility();
			  	}
			}

			$scope.save = function () {
				$scope.x.data=$scope.input;
			}
			$scope.edit= function () {
				$scope.input=$scope.x.data;
			}

			$scope.newData = function () {
				var index=$scope.$parent.$parent.list2.indexOf($scope.x);
				var da=new Data("D","");
				$scope.$parent.$parent.list2.splice(index+1,0,da);
				$timeout(function () {
					angular.element(document.getElementById("editor")).trigger("click");
					angular.element(document.getElementById("editor")).trigger("click");
					var req=angular.element($element.parent().children()[index+1]).children();
					angular.element(req[5]).children().trigger("click");
				},0);
			}
			$scope.newList = function () {
				function getHeading() {
					var headings=prompt("Please give a heading to the new List:","Heading...");
					if(headings==null||headings==''){
						alert("Please dont keep it empty");
						return getHeading();
					}
					else{
						return headings;
					}
				}
				var index=$scope.$parent.$parent.list2.indexOf($scope.x);
				var li=new List();
				var da=new Data("L",li);
				li.add("H",getHeading());
				li.add("D","");
				$scope.$parent.$parent.list2.splice(index+1,0,da);
				$timeout(function () {
					angular.element(document.getElementById("editor")).trigger("click");
					angular.element(document.getElementById("editor")).trigger("click");
					var req=angular.element($element.parent().children()[index+1]).children();
					angular.element(angular.element(angular.element(req[1]).children()[5]).children()[0]).trigger("click")
				},0);
			}

			var mouseDown=false;
			$scope.down=function () {
				mouseDown=true;
				$timeout(function() {
					if(mouseDown){
						if($element.hasClass("data")){
							angular.element($element.children()[0]).css("display","none");
							angular.element($element.children()[1]).css("display","table-cell");
						}
						
						mouseDown=false;
					}
				}, 2000);
			}
			$scope.up=function () {
				if(mouseDown){
					mouseDown=false;
					if($element.attr("reading")=='false'){
						$element.css("text-decoration","line-through");
						$element.attr("reading",true);
						$scope.x.read=true;
					}
					else if($element.attr("reading")=='true'){
						$element.css("text-decoration","none");
						$element.attr("reading",false);
						$scope.x.read=false;
					}
				}
			}
			$scope.leave=function () {
				angular.element($element.children()[0]).css("display","table-cell");
				angular.element($element.children()[1]).css("display","none");
			}

			var visible=false;
			$scope.visibility = function () {
				var ch=$element.children();
				if(visible==false){
					angular.element(ch[2]).css("display","none");
					angular.element(ch[3]).css("display","table-cell");
					angular.element(ch[3]).focus();
					angular.element(ch[4]).css("display","table-cell");
					angular.element(ch[5]).css("display","table-cell");
					angular.element(ch[6]).css("display","none");
					angular.element(ch[7]).css("display","none");
					angular.element(ch[8]).css("display","none");
					visible=true;
				}
				else{
					angular.element(ch[2]).css("display","table-cell");
					angular.element(ch[3]).css("display","none");
					angular.element(ch[3]).blur();
					angular.element(ch[4]).css("display","none");
					angular.element(ch[5]).css("display","none");
					if(test){
						angular.element(ch[6]).css("display","table-cell");
						angular.element(ch[7]).css("display","table-cell");
						angular.element(ch[8]).css("display","table-cell");
					}
					visible=false;
				}
			}

			$scope.delete=function () {
				var index=$scope.$parent.$parent.list2.indexOf($scope.x);
				$scope.$parent.$parent.list2.splice(index,1);
			}
			$element.attr("reading",x.read);
			if(x.read){
				$element.css("text-decoration","line-through");
			}
			$element.empty();
			$element.append(tempOfData());
			$element.addClass("data");
			$compile($element.contents())($scope);
		}
		else if(x.type=="L"){
			if($element.parent().hasClass("first")){
				$element.addClass("second");
			}
			if($element.parent().hasClass("second")){
				$element.addClass("third");
			}
			if($element.parent().hasClass("third")){
				$element.addClass("first");
			}
			$element.addClass("list");
			$element.empty();
			$scope.list2=x.data.data;
			console.log();
			if($scope.list2.length>1){
				$element.append('<div ng-repeat="x in list2" ng-controller="data" ng-init="init(x)">{{x.data}}</div>');
			}
			$compile($element.contents())($scope);
		}
	}
});

content.controller('start',function ($scope, $element, $compile,$timeout) {
	$scope.list=new List();
	/*
	$scope.lists=new List();
	$scope.list2=new List();
	$scope.list3=new List();
	$scope.lists.add("H","head",false);
	$scope.list2.add("H","head2",false);
	$scope.list3.add("H","head3",false);
	$scope.list.add("L",$scope.lists,false);
	$scope.lists.add("D","JKL2",true);
	$scope.lists.add("D","JKL",false);
	$scope.lists.add("L",$scope.list2,false);
	$scope.lists.add("D","DFG",false);
	$scope.list2.add("D","POI",true);
	$scope.list2.add("D","POI2",false);
	$scope.list2.add("L",$scope.list3,false);
	$scope.list2.add("D","POI3",false);
	$scope.list3.add("D","BNM1",false);
	*/
	$scope.addList=function () {
		function getHeading() {
			var headings=prompt("Please give a heading to the new List:","Heading...");
			if(headings==null||headings==''){
				alert("Please dont keep it empty");
				return getHeading();
			}
			else{
				return headings;
			}
		}
		var li=new List();
		var da=new Data("L",li,false);
		li.add("H",getHeading(),false);
		li.add("D","",false);
		$scope.list.data.splice($scope.list.data.length+1,0,da);
		$timeout(function() {
			angular.element(angular.element(angular.element(angular.element(angular.element($element.children()[$scope.list.data.length-1]).children()[1])).children()[6]).children()[0]).trigger("click");
		}, 0);
	}
});
angular.bootstrap(document.getElementById('Content'),["Content"]);

function tempOfData() {
return '<div class="glyphs">\
			<span class="glyphicon glyphicon-record glyphs-data" ng-mousedown="down()" ng-mouseup="up()"></span>\
		</div>\
		<div class="glyphs delete" >\
			<span class="glyphicon glyphicon-trash glyphs-data" ng-mouseup="delete()" ng-mouseleave="leave()"></span>\
		</div>\
		<span class="text" >{{x.data}}</span>\
		<input type="text" class="input" ng-model="input" ng-keypress="disable_input($event)">\
		<div  class="glyphs save">\
			<span class="glyphicon glyphicon-ok glyphs-data" ng-click="save();visibility()"></span>\
		</div>\
		<div  class="glyphs doNotSave">\
			<span class="glyphicon glyphicon-remove glyphs-data" ng-click="visibility()"></span>\
		</div>\
		<div class="glyphs edit">\
			<span class="glyphicon glyphicon-pencil glyphs-data" ng-click="edit();visibility()"></span>\
		</div>\
		<div class="glyphs addData">\
			<span class="glyphicon glyphicon-plus glyphs-data" ng-click="newData()" ></span>\
		</div>\
		<div class="glyphs addList">\
			<span class="glyphicon glyphicon-list glyphs-data" ng-click="newList()"></span>\
		</div>';
}