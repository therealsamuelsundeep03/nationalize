//get name.
getname=()=>{
    var name= document.getElementById("name");
    getdata(name.value);
    document.querySelector('form').reset();
    let container=document.getElementsByClassName("container")[0];
    container.style.display="block";
}
//getting data(which nationality the person may belong to) of the name.
async function getdata(name){
    try{
      let resp= await fetch(`https://api.nationalize.io?name=${name}`);
      let data= await resp.json();
      console.log(data.country);
      if(data.country.length == 0){
        let body = document.querySelector("body");
        body.innerHTML = "";
        let nameError = document.createElement("p");
        nameError.className = "nameError";
        nameError.innerHTML = "Either you may have entered a wrong name or your name is unique. ";
        let p = document.createElement("p");
        p.innerHTML = "please refresh to retain the page."
        document.body.append(nameError,p);
      }
      let [id_1,id_2,id_3]= [data.country[0].country_id,data.country[1].country_id,data.country[2].country_id];
      let pb=[]
      for(let i=0;i<3;i++){
        pb.push(((data.country[i].probability)*100).toFixed(2))
      }
      country(id_1,id_2,id_3,pb,name);
    }
    catch(errors){
      let error= document.createElement("p");
      error.innerHTML=("1. check your internet connectivity.");
    }     
}
// getting country name from their id.
async function country(id_1,id_2,id_3,pb,name){
    try{
      let resp= await fetch(`https://restcountries.com/v3/alpha?codes=${id_1},${id_2},${id_3}`);
    let data= await resp.json();
    console.log(data);
    let countries=[];
    data.forEach((ele)=>{
      if(ele.altSpellings[1] != null){
        countries.push(ele.altSpellings[1]);
      }else countries.push(ele.altSpellings[0])
    });
    console.log(countries)
    // converting the probabilities to add up to the styling.
    let inPerCent=[];
    pb.forEach((e)=>{
        inPerCent.push(e*2);
    });
    // assigning the variables
    let progress_bar1=document.getElementsByClassName("progress-bar1")[0];
    let progress_bar2=document.getElementsByClassName("progress-bar2")[0];
    let progress_bar3=document.getElementsByClassName("progress-bar3")[0];
    let prob1=document.getElementById("prob1");
    let prob2=document.getElementById("prob2");
    let prob3=document.getElementById("prob3");
    let country_name1=document.getElementById("country_name1");
    let country_name2=document.getElementById("country_name2");
    let country_name3=document.getElementById("country_name3");
    let person= document.getElementsByClassName("person")[0];
    // assigning values
    person.innerHTML= name;
    prob1.innerHTML=pb[0]+"%";
    prob2.innerHTML=pb[1]+"%";
    prob3.innerHTML=pb[2]+"%";    
    country_name1.innerHTML=countries[0];
    country_name2.innerHTML=countries[1];
    country_name3.innerHTML=countries[2];
    // transition effects
    function transitionBar(progressBar,value){
      progressBar.querySelector(".progress-fill").style.width = `${value}px`;
    }
    transitionBar(progress_bar1,inPerCent[0]);
    transitionBar(progress_bar2,inPerCent[1]);
    transitionBar(progress_bar3,inPerCent[2]);
    }    catch(errors){
      let error= document.createElement("p");
      error.innerHTML=("1. check your internet connectivity.");
    }  
}
// getdata();