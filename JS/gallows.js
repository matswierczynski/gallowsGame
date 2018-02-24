var password="Where is Nemo";
var alphabetLength = 26;
var lettersColumns = 6;
var UpperCaseLettersStart = 65;
var curMissed = 0;
var noOfFailures=9;
var yes = new Audio("./sound/yes.wav");
var no = new Audio("./sound/no.wav");
var transformedToHiddenString ="";




function preparePassword()
{
	password = password.toUpperCase();
	
	for (i=0; i<password.length; i++)
	{
		if (password.charAt(i)==" ")
			transformedToHiddenString +=" ";
		else
			transformedToHiddenString+="-";
	}
}

function printPassword()
{
	document.getElementById("board").innerHTML = transformedToHiddenString;
	
}

function start()
{
	preparePassword();
	printPassword();
	for (i=0; i<alphabetLength; i++)
	{
		
		if (i % lettersColumns == 0)
		{
			var clear = document.createElement("div");
			clear.style="clear: both;";
			document.getElementById("alphabet").appendChild(clear);
		}
		
			var letter = document.createElement("div");
			letter.className="letter";
			letter.id = "letter"+i;
			letter.onclick = function() {check(this.id);}
			var letterLabel = String.fromCharCode(UpperCaseLettersStart+i);
			var node = document.createTextNode(letterLabel);
			letter.appendChild(node);
			document.getElementById("alphabet").appendChild(letter);
	}
}

String.prototype.setToken = function (position, token)
{
	if (position > this.length-1)
		{
			return this.toString();
		}
	else 
		{ 
			return this.substr(0, position)+token+this.substr(position+1);
		}
}

function check(letterClickedId)
{
	var letterClicked =  document.getElementById(letterClickedId).innerHTML;
	
	var hit = false;
	
	for(i=0; i<password.length; i++)
	{
		if (password.charAt(i) == letterClicked)
		{
			transformedToHiddenString = transformedToHiddenString.setToken(i, letterClicked);
			hit = true;
		}
	}
	
	if (hit == true)
	{
		yes.play();
		document.getElementById(letterClickedId).style.backgroundColor = "#003300";
		document.getElementById(letterClickedId).style.color = "#00C000";
		document.getElementById(letterClickedId).style.border = "3px solid #00C000";
	}
	else
	{
		no.play();
		document.getElementById(letterClickedId).style.backgroundColor = "#330000";
		document.getElementById(letterClickedId).style.color = "#C00000";
		document.getElementById(letterClickedId).style.border = "3px solid #C00000";
		
		curMissed++;
		var imgPath = "./img/s"+curMissed+".jpg";
		document.getElementById("gallows").innerHTML = '<img src="'+imgPath+'"  alt = "Gallows" />';
	}
	
	document.getElementById(letterClickedId).style.cursor = "default";
	document.getElementById(letterClickedId).setAttribute ("onclick", ";");
	
	//winner
	if (password == transformedToHiddenString)
		document.getElementById("alphabet").innerHTML = "Password is correct: "+password+'<br/><br/><button id="replayBtn" onclick="location.reload()">REPLAY</button>';
	
	//looser
	if (curMissed == noOfFailures)
		document.getElementById("alphabet").innerHTML = 'Password has not been guessed</br>Correct password: '+password+'<br/><br/><button id="replayBtn" onclick="location.reload()">REPLAY</button>';
	
	printPassword();
}


window.onload = start();

