function calculateAge(){
    var age = prompt("Enter your birth year");
    var ageInDays = (2022-age)*365;

    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ ageInDays+' days old.')

    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);

    document.getElementById('result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();
}