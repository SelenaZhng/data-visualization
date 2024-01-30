//Selena Zhang 7/30/21
//My program uses the top Spotify songs from 2010 and 2019 and finds the music genre of each song. 
//It counts how many times each genre appears (for both years) and turns the counts into percentages.
//The squares' size represents the percentage and each different color is a different genre.
//It should show how Spotify users' music tastes have slightly changed over some time.

//I wanted to make the percentages interactive (so when you hover over a square you can see the %), 
//and have the genre labels align vertically w/ their corresponding squares,
//but I couldn't figure out how to do either of those tasks.


let table;
let myFont;
function preload() {
  table = loadTable("top10s.csv", "csv", "header");
  myFont = loadFont('PatrickHand-VMAl.ttf');
}

//genres of top songs for 2010 and 2019
let twentyTen = [];
let twentyNineteen = [];
//number of times each genre appears
let times2010 = [];
let times2019 = [];
//arrays for percentage of each genre in 2010 and 2019
let timesPercent2010 = [];
let timesPercent2019 = [];


function setup() {
  createCanvas(2000, 1000);
  //console.log(table.getRowCount());
  console.log(table.columns);

  let genres = table.getColumn(3);
  let year = table.getColumn(4);

  fill("#9D9D9D");
  textFont(myFont);
  textSize(70);
  text("2010", 1000, 140);
  text("2019", 1000, 640);

  //seeing how many different genres there are
  //let knownGenres = [];
  //for (let i = 0; i < genres.length; i++) {
  //  let gName = genres[i];
  //  if (knownGenres.includes(gName)) {
  //  } else {
  //    knownGenres.push(gName);
  //  }
  //}
  //print(knownGenres);
  //print(knownGenres.length);


  for (i = 0; i < year.length; i++) {
    if (year[i] == 2010) {
      append(twentyTen, genres[i]);
    } else if (year[i] == 2019) {
      append(twentyNineteen, genres[i]);
    }
  }
  //print(twentyTen);
  //print(twentyNineteen);


  //different genres in 2010 and 2019
  let genres2010 = [];
  let genres2019 = [];

  for (let k = 0; k < twentyTen.length; k++) {
    let gName10 = twentyTen[k];
    if (genres2010.includes(gName10)) {
    } else {
      genres2010.push(gName10);
    }
  }
  for (let j = 0; j < twentyNineteen.length; j++) {
    let gName19 = twentyNineteen[j];
    if (genres2019.includes(gName19)) {
    } else {
      genres2019.push(gName19);
    }
  }
  print(genres2010);
  print(genres2019);


  //setting array values to 0
  for (k = 0; k < genres2010.length; k++) {
    times2010[k] = 0;
  }
  for (k = 0; k < genres2019.length; k++) {
    times2019[k] = 0;
  }

  //2010
  for (i = 0; i < twentyTen.length; i++) {
    for (j = 0; j < genres2010.length; j++) {
      if (twentyTen[i] == genres2010[j]) {
        times2010[j] = times2010[j] + 1;
        break;
      }
    }
  }
  //2019
  for (i = 0; i < twentyNineteen.length; i++) {
    for (j = 0; j < genres2019.length; j++) {
      if (twentyNineteen[i] == genres2019[j]) {
        times2019[j] = times2019[j] + 1;
        break;
      }
    }
  }
  //print(times2010);
  //print(times2019);


  for (i = 0; i < times2010.length; i++) {
    timesPercent2010[i] = round((times2010[i] / twentyTen.length) * 100);
  }
  for (i = 0; i < times2019.length; i++) {
    timesPercent2019[i] = round((times2019[i] / twentyNineteen.length) * 100);
  }
  print(timesPercent2010);
  print(timesPercent2019);


  //genre color arrays
  let color2010 = ["#A8A488", "#748F86", "#AA6F73", "#BE7145", "#72A3A5", "#E7C6AD", "#825D7F", "#949BA3", "#D3955C", "#E9A3A1", "#857962", "#BFD1DE", "#E7C082"];
  let color2019 = ["#BE7145", "#AA6F73", "#72A3A5", "#211C32", "#9FC0CD", "#B88F7B", "#D2C3AE", "#BFADB5", "#3C5E84", "#E7C082", "#6B4E5B", "#ECDBAD"];


  //squares & labels for 2010
  let previousx = 0;
  let labelPos = 0;
  let labelVert = 80;
  let labelVert2 = 580;
  
  for (l = 0; l < color2010.length; l++) {
    if (l == 0) {
      previousx = 40;
    } else {
      previousx = previousx + timesPercent2010[l-1]*5 + 30;
    }
    rectangle(previousx, 100, timesPercent2010[l]*5, timesPercent2010[l]*5, color2010[l]);
    //Sz begin: 8/1/2021: locate labels on top of squares
    labelLine((previousx + (previousx+timesPercent2010[l]*5))/2, labelVert + 7, (previousx + (previousx+timesPercent2010[l]*5))/2, 100, "#9D9D9D");
    labels(genres2010[l]+"\n"+timesPercent2010[l]+"%", (previousx + (previousx+timesPercent2010[l]*5))/2, labelVert - 12, "#2E2E2E", 13);
    
    if (labelPos==1)
    {
      labelPos = 0;
      labelVert = 80;
    }
    else
    {
      labelPos = 1;
      labelVert = 40;
    }
    //Sz end
  }

  //squares & labels for 2019
  let previousx2 = 0;
  for (m = 0; m < color2019.length; m++) {
    if (m == 0) {
      previousx2 = 40;
    } else {
      previousx2 = previousx2 + timesPercent2019[m-1]*5 + 30;
    }
    rectangle(previousx2, 600, timesPercent2019[m]*5, timesPercent2019[m]*5, color2019[m]);
    labelLine((previousx2 + (previousx2+timesPercent2019[m]*5))/2, labelVert2 + 7, (previousx2 + (previousx2+timesPercent2019[m]*5))/2, 600, "#9D9D9D");
    labels(genres2019[m]+"\n"+timesPercent2019[m]+"%", (previousx2 + (previousx2+timesPercent2019[m]*5))/2, labelVert2 - 12, "#2E2E2E", 13);
    
    if (labelPos==1)
    {
      labelPos = 0;
      labelVert2 = 580;
    }
    else
    {
      labelPos = 1;
      labelVert2 = 540;
    }
  }
  
      
}


function draw() {
 /* background(white);
  if (mouseX>50 && mouseX<100 && mouseY>100 && mouseY<200)
    {
    textFont(myFont);
    textSize(30);
    text("mousex="+mouseX+", mousey="+mouseY, 100, 50);
    }
    
  

  let previousx = 0;
  for (l = 0; l < 13; l++) {
    if (l == 0) {
      previousx = 40;
    } else {
      previousx = previousx + timesPercent2010[l-1]*5 + 20;
    }
    //rectangle(previousx, 100, timesPercent2010[l]*5, timesPercent2010[l]*5, color2010[l]);
    if(mouseX>previousx && mouseX<previousx+timesPercent2010[l]*5 && mouseY>100 && mouseY<100+timesPercent2010[l])
    {
      //labels(genres2010[l], previousx, 90, "#9D9D9D", 20);
      fill("FF0088");
      text("test",previousx,90);
    }
  }
  */
  
}


function rectangle(x, y, w, h, c, hasOutline = false) {
  push();
  fill(c);
  if (hasOutline == true) {
    noStroke();
  } else {
    noStroke();
  }
  rect(x, y, w, h);
  pop();
}


function labels(t, xaxis, yaxis, c, s) {
  push();
  textSize(s);
  fill(c);
  text(t, xaxis, yaxis);
  pop();
}


function labelLine(oneX, oneY, twoX, twoY, lineC) {
  stroke(lineC);
  line(oneX, oneY, twoX, twoY);
}
