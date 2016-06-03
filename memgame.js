var t=0;
var arr=[],cstatus=[],n=0,prevelement=16,cm=0,secs=20,moves=0;
//arr will store the element that is being matched in the array
//cstatus will be 0 if element is currently closed
//it is 1 if it is temporarily open
//it is 2 if it is permanently open that is succesfully solved
//n is no of boxes currently open and prevelement is the value of the box last
//opened with appropriate conditions


  for(i=0;i<8;++i){
    arr[i]=arr[i+8]=i+1;
    cstatus[i]=cstatus[i+8]=0;
  }

  //allocate random locations for the values
  var len=arr.length,temp,randomIndex;
    for(i=len-1;i>=0;i--)
    {
      randomIndex=Math.floor(Math.random()*i);
      temp=arr[i];
      arr[i]=arr[randomIndex];
      arr[randomIndex]=temp;
  }

  arr[16]=10;          //a value that is never reached

  function timer(){
    secs=secs-1;
    document.getElementById('timeleft').innerHTML="Timeleft: "+secs+" seconds";
    if(secs == 0){
      window.alert("Time up! You have made "+cm+" correct matches ");
      location.reload();
    }

  }

function startfunc(){
  if(t==0){
    t=1;
    intr=setInterval(timer,1000);
  }
}
function checkelement(i){
    if(t==1){
      if(cstatus[i]!=2 && cstatus[i]!=1){
        moves++;
        document.getElementById('moves').innerHTML="Moves: "+moves; //element is not solved or currently open
      if(n==0){
          //no other element is currently open
          prevelement=i;             //this element is opened
          opener(i);
          n=1;
          cstatus[i]=1;
      }
      else{
          cstatus[i]=1;
          opener(i);
          comparer(i,prevelement);
      }
    }
  }
}
function comparer(i,prevelement){
  if(arr[i]==arr[prevelement]){
    cstatus[i]=cstatus[prevelement]=2;
    n=0; prevelement=16;
    cm=cm+1;
    document.getElementById('correctmoves').innerHTML="CorrectMatches: "+cm;

    if(cm==8)
      alert("You Have Won!");
  }
  else{
    cstatus[i]=cstatus[prevelement]=0;
    n=0;
    setTimeout(closer,1500,prevelement,i);
    prevelement=16;
    }
}
function delay(){
}
function opener(l){
  document.getElementById('index'+l).innerHTML=arr[l];
}
function closer(l,k){
  //show element before closing it

  //document.getElementById('index'+i).style.transform="rotateX(360deg)";
  document.getElementById('index'+l).innerHTML='-';
  document.getElementById('index'+k).innerHTML='-';
}
