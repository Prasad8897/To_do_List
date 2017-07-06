
var edit=document.getElementsByClassName("edit");
var addData=document.getElementsByClassName("addData");
var addList=document.getElementsByClassName("addList");
var save=document.getElementsByClassName('save');
var doNotSave=document.getElementsByClassName('doNotSave');
var test=false;

function EditingMode() {
	var l=addList.length;
	var i=0;
	if(test==true){
		for(i=0;i<l;i++){
			edit[i].style.display='none';
			addList[i].style.display='none';
			addData[i].style.display='none';		
			save[i].style.display="none";
			doNotSave[i].style.display="none";
		}
		test=false;
	}
	else{
		for(i=0;i<l;i++){
			edit[i].style.display='table-cell';
			addList[i].style.display='table-cell';
			addData[i].style.display='table-cell';
		}
		test=true;
	}		
}