const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const path=require('path');
const flash = require('connect-flash');
const { connect } = require("http2");
const req = require("express/lib/request");

app.use(session({
  secret: "the quick brown fox jumps over the lazy dog",
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(flash());
app.use(function(req,res,next){
  res.locals.username = req.username;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bill',
  password: 'billy',
  database: 'test'
});


function markAsResolved(qid){
  query = 'UPDATE Questions SET resolved=true WHERE Qid=?';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[qid],function(error,questions,fields){
      if (error) throw error;
      console.log(questions);
      resolve(questions);
    });
  });
  return promise;

}

//get all questions
function getAllQuestions(){
  query = 'SELECT * FROM Questions,Topics, Subtopics WHERE Questions.Tid = Topics.Tid and Topics.Tid = Subtopics.Tid and Questions.subtopic_name = Subtopics.subtopic_name ORDER BY date_posted DESC, time_posted ASC';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,questions,fields){
      if (error) throw error;
      console.log(questions);
      resolve(questions);
    });
  });
  return promise;

}
//get all topics
function getAllTopics(){
  query = 'SELECT * FROM Topics';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,topics,fields){
      if (error) throw error;
      resolve(topics);
    });
  });
  return promise;

}
//get all subtopics 
function getAllSubtopics(){
  query = 'SELECT * FROM Subtopics';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,subtopics,fields){
      if (error) throw error;
      resolve(subtopics);
    });
  });
  return promise;

}

//return questions based on Qid
function getQuestionById(str){
  query = "SELECT * FROM Questions,Topics WHERE Topics.Tid = Questions.Tid and Questions.Qid=" + mysql.escape(str) + "ORDER BY date_posted DESC, time_posted ASC";
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,questions,fields){
      if (error) throw error;
      resolve(questions);
    });
  });
  return promise;

}

function getUserById(str){
  query = "SELECT * FROM Users WHERE username=" + mysql.escape(str);
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,questions,fields){
      if (error) throw error;
      resolve(questions);
    });
  });
  return promise;

}
//return a 1 if user already exists, 0 otherwise
function isUsernameRegistered(username){
  query = "SELECT * FROM Users Where Users.username = " + mysql.escape(username);
  const promise = new Promise((resolve,reject) => {
    connection.query(query,[],function(error,results,fields){
      if (error) throw error;
      if (results.length > 0){
        resolve(1);

      }else{
        resolve(0);
      }

    });

  });
  return promise;

};
//get number of total likes (used to create new Lid)
function getLikes(){
  query='SELECT count(*) as num_likes FROM Likes';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,likes,fields){
      if (error) throw error;
      resolve(likes);
    });
  });
  return promise;

}

//get number of total topics (used to create new Tid)
function getTopics(){
  query='SELECT count(*) as num_topics FROM Topics';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,topics,fields){
      if (error) throw error;
     
      resolve(topics);
    });
  });
  return promise;

}
//get total number of quesitons (used to cerate new Qid)
function getQuestions(){
  query='SELECT count(*) as num_questions FROM Questions';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,questions,fields){
      if (error) throw error;
     
      resolve(questions);
    });
  });
  return promise;

}
function getQuestionsFromUser(str){
  query='SELECT * FROM Questions,Topics Where Questions.username = ? and Topics.Tid = Questions.Tid ORDER BY date_posted DESC, time_posted ASC';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[str],function(error,questions,fields){
      if (error) throw error;
     
      resolve(questions);
    });
  });
  return promise;

}

function getAnswersQuestionsFromUser(str){
  query='Select Answers.Aid AS answer_aid, Answers.Qid AS answer_qid, Answers.username AS answer_username, Answers.body AS answer_body, Answers.date_posted AS answer_dateposted,' +
  'Answers.time_posted as answer_timeposted, Questions.Qid as question_qid, Questions.username as question_username, Questions.title as question_title, Questions.body' +
  ' AS question_body, Questions.date_posted as question_dateposted, Questions.time_posted as question_timeposted, Topics.topic_name as questions_topicname, Questions.subtopic_name' + 
  ' as question_subtopicname, Questions.resolved as question_resolved from Answers,Questions, Topics' + 
  ' Where Answers.Qid = Questions.Qid and Topics.Tid = Questions.Tid and Answers.username = ? ORDER BY Answers.date_posted DESC, Answers.time_posted ASC';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[str],function(error,answersquestions,fields){
      if (error) throw error;
     
      resolve(answersquestions);
    });
  });
  return promise;

}

function doesTopicExist(topic_name){
  query='SELECT * FROM Topics WHERE Tid = ?';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[topic_name],function(error,topics,fields){
      if (error) throw error;
     
      resolve(topics);
    });
  });
  return promise;

}
function doesSubtopicTopicExist(tid,subtopic_name){
  query='SELECT * FROM Subtopics WHERE Tid = ? and subtopic_name = ?';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[tid,subtopic_name],function(error,subtopics,fields){
      if (error) throw error;
     
      resolve(subtopics);
    });
  });
  return promise;

}
//get number of total users (used to create new Uid)
function getUsers(){
  query='SELECT count(*) as num_users FROM Users';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,users,fields){
      if (error) throw error;

      resolve(users);
    });
  });
  return promise;


}

function hasUserLikedAnswer(likes, username,aid){
  query='SELECT count(*) as has_user_liked FROM Likes Where Likes.aid = ? and LikerUsername = ?';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[aid,username],function(error,hasLiked,fields){
      if (error) throw error;
     
      results = [likes,hasLiked];
      resolve(results);
    });
  });
  return promise;


}
function getTopicNameFromTid(tid){
  query = 'SELECT topic_name FROM Topics where Tid = ?';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[tid],function(error,topicName,fields){
      if (error) throw error;
   
      resolve(topicName);
    });
  });
  return promise;

}
//use to get number of answers
function getAnswers(){

  query = 'SELECT count(*) as num_answers FROM Answers';
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,answers,fields){
      if (error) throw error;
   
      resolve(answers);
    });
  });
  return promise;

}
function insertNewTopic(tid,topic_name){
 
  let sql = "INSERT INTO Topics (Tid, topic_name) VALUES ('" + tid + "','" + topic_name + "')";
  
  const promise = new Promise((resolve, reject) => {
    connection.query(sql,[],function(error,results,fields){
      if (error) throw error;
      resolve(results);
    });
  });
  return promise;
}
function insertNewSubtopic(tid,subtopic_name){
 
  let sql = "INSERT INTO Subtopics (Tid, subtopic_name) VALUES ('" + tid + "','" + subtopic_name + "')";
  
  const promise = new Promise((resolve, reject) => {
    connection.query(sql,[],function(error,results,fields){
      if (error) throw error;
      resolve(results);
    });
  });
  return promise;
}
function insertNewQuestion(Qid, username, title, body, date_posted, time_posted, tid, subtopic_name, resolved){
 
  let sql = "INSERT INTO Questions (Qid, username, title, body, date_posted, time_posted, Tid, subtopic_name, resolved) VALUES ('" + Qid + "','" + username + "','" + title + "','" + body + "','" + date_posted + "','" + time_posted + "','" +tid + "','" +subtopic_name+ "'," +resolved + ")";
  
  const promise = new Promise((resolve, reject) => {
    connection.query(sql,[],function(error,results,fields){
      if (error) throw error;
     
      resolve(results);
    });
  });
  return promise;
}
function insertNewAnswer(aid, qid, username, body, date_posted, time_posted, best_answer){

  let sql = "INSERT INTO Answers (Aid, Qid, username, body, date_posted, time_posted, best_answer) VALUES ('" + aid + "','" + qid + "','" + username + "','" + body + "','" + date_posted + "','" + time_posted + "'," +best_answer + ")";
  
  const promise = new Promise((resolve, reject) => {
    connection.query(sql,[],function(error,results,fields){
      if (error) throw error;
     
      resolve(results);
    });
  });
  return promise;
}
function getAnswersByQid(str,questions){

  query = 'SELECT Answers.Aid, Qid, username, body, date_posted, time_posted, IF(Answers.aid in (select Aid From Likes), (select count(*) from Likes Where Answers.Aid=Aid), 0) as num_likes FROM Answers, Likes Where Answers.Qid=' + mysql.escape(str) + 'group by Answers.aid ORDER BY Answers.date_posted DESC, Answers.time_posted ASC'; 
  const promise = new Promise((resolve, reject) => {
    connection.query(query,[],function(error,answers,fields){
      if (error) throw error;
  
      results = [questions,answers]
      resolve(results);
    });
  });
  return promise;

}

app.get("/",function(req,res){

    getAllQuestions().then((questions) => res.render("home",{currUser: req.session.username,loggedIn:req.session.loggedin,questions:questions})); 

});

app.get("/users/:id/answers",async function(req,res){

  let results = await getAnswersQuestionsFromUser(req.params.id);

  res.render('myanswers',{currUser: req.session.username, results:results,loggedIn:req.session.loggedin})
  
});

app.get("/login",function(req,res){
  res.render("login");  
});
app.get('/newquestion',async function(req,res){
  //get topics and subtopics and add to ejs
  if (!req.session.loggedin){
    req.flash("error","Log in first!");
    res.redirect('/');
    
  }else{
    let topics = await getAllTopics();
    let subtopics = await getAllSubtopics();

    res.render("newquestion",{currUser: req.session.username,topics:topics,subtopics:subtopics});
  }
  
});
app.post('/newquestion',async function(req,res){
  //console.log(req.body);
  let subtopic_name = '';
  if (req.body.realsubtopic.includes(",")){
    subtopic_name = req.body.realsubtopic.split(',')[1];

  }else{
    subtopic_name = req.body.realsubtopic;
  }
  console.log(subtopic_name);
  let topic_name = req.body.realtopic;
  let title = req.body.title;
  let body = req.body.body;
  let username = req.session.username;
  let date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);

  // get current month
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

  // get current year
  let year = date_time.getFullYear();

  // get current hours
  let hours = date_time.getHours();

  // get current minutes
  let minutes = date_time.getMinutes();

  // get current seconds
  let seconds = date_time.getSeconds();

  let date_posted = year + '-' + month + '-' + date;
  let time_posted = hours + ':' + minutes + ':' + seconds;
  let resolved = 'no';
  console.log(subtopic_name);
  console.log(topic_name);
 
  let isTopic = await doesTopicExist(topic_name);

  if (isTopic.length > 0){

    console.log("topic exists");
    let isTopicSubtopic = await doesSubtopicTopicExist(topic_name,subtopic_name);
   
    if (isTopicSubtopic.length > 0){
      console.log("topic subtopic combo exists");
      let questions = await getQuestions();
      let q_num = parseInt(questions[0].num_questions) + 1;
      let newQid = "Q" + q_num.toString();
      await insertNewQuestion(newQid,req.session.username,title,body,date_posted,time_posted,topic_name,subtopic_name,false);
      req.flash("success", "Great question!");
      res.redirect('/');
    }else{
      console.log("topic subtopic combo does not exist");
      await insertNewSubtopic(topic_name,subtopic_name);
      let questions = await getQuestions();
      let q_num = parseInt(questions[0].num_questions) + 1;
      let newQid = "Q" + q_num.toString();
      await insertNewQuestion(newQid,req.session.username,title,body,date_posted,time_posted,topic_name,subtopic_name,false);
      req.flash("success", "Great question!");
      res.redirect('/');

    }

  }else{
    console.log("topic doesn't exist");
    let topics = await getTopics();
    let num = parseInt(topics[0].num_topics) + 1;
    let newTid = "L" + num.toString();
    
    await insertNewTopic(newTid,topic_name);
    await insertNewSubtopic(newTid,subtopic_name);
    let questions = await getQuestions();
    let q_num = parseInt(questions[0].num_questions) + 1;
    let newQid = "Q" + q_num.toString();
    await insertNewQuestion(newQid,req.session.username,title,body,date_posted,time_posted,newTid,subtopic_name,false);
    req.flash("success", "Great question!");
    res.redirect('/');
  

  }
  

});
app.get("/giveanswer/:id", async function(req,res){
  if (req.session.loggedin){
    let questions = await getQuestionById(req.params.id);
    res.render("giveanswer",{currUser: req.session.username,loggedIn:req.session.loggedin,questions:questions});
  }else{
    req.flash("error","login first!");
    res.redirect('/');
  }
});

app.post("/giveanswer", async function(req,res){

  let date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);

  // get current month
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

  // get current year
  let year = date_time.getFullYear();

  // get current hours
  let hours = date_time.getHours();

  // get current minutes
  let minutes = date_time.getMinutes();

  // get current seconds
  let seconds = date_time.getSeconds();

  let date_posted = year + '-' + month + '-' + date;
  let time_posted = hours + ':' + minutes + ':' + seconds;
  let num_answers = await getAnswers();
  let a_num = parseInt(num_answers[0].num_answers) + 1;
  let newAid = "A" + a_num.toString();
  await insertNewAnswer(newAid, req.body.Qid, req.session.username, req.body.answer, date_posted, time_posted, false);
  req.flash("success", "Great Answer!");
  res.redirect('/');

});
app.get("/users/:id",async function(req,res){
 
  let users = await getUserById(req.params.id);
  res.render('myaccount',{currUser: req.session.username,loggedIn:req.session.loggedin,users:users});

});
app.get("/users/:id/questions",async function(req,res){
  console.log("questions");
  let questions = await getQuestionsFromUser(req.params.id);
 
  //let topicName = await getTopicNameFromTid(questions[0].Tid);
  getQuestionsFromUser(req.params.id).then((questions) => res.render("home",{currUser: req.session.username,loggedIn:req.session.loggedin,questions:questions})); 


})
app.get("/questions/:id",async function(req,res){
    let questions = await getQuestionById(req.params.id);
    let results = await getAnswersByQid(req.params.id,questions);
    console.log(results[1]);
    res.render("question",{currUser: req.session.username,loggedIn:req.session.loggedin,questions:results[0],answers: results[1]})

});

app.get('/signup',function(req,res){
  res.render("signup",{loggedIn:req.session.loggedin});
});

app.post('/signup', async function(req,res){

    let registered = await isUsernameRegistered(req.body.username);
    if (registered == 1){
      req.flash("error", "Username is taken! choose another!");
      res.redirect('/signup');
    }else{
      let sql = "INSERT INTO Users (username, upassword, first_name, last_name, email, city, state, country, user_status, uprofile) VALUES (" + mysql.escape(req.body.username) + ", '" + req.body.password + "','" + req.body.firstname+ "','" + req.body.lastname + "','" + req.body.email + "','" + req.body.city + "','" + req.body.state + "','" + req.body.country + "','novice'" + ",'" + req.body.uprofile+"');";
        connection.query(sql,[],function(error,results,fields){
            if (error) throw error;
            req.flash("success", "Hello, " + req.body.username + ". Welcome!");
            req.session.loggedin = true;
            req.session.username = req.body.username;
            res.redirect("/");
        });
    }
  });

app.post('/addlike',async function(req,res){
  console.log(req.session.username);
  let likes = await getLikes();
  let results = await hasUserLikedAnswer(likes,req.session.username,req.body.aid);
  if (results[1][0].has_user_liked){
    //res.redirect('/');
    res.redirect(req.get('referer'));
      
  }else{
    let likes = results[0];
        let sql = "INSERT INTO Likes (Lid, Aid, LikerUsername) VALUES ('L" + mysql.escape(likes[0].num_likes+1) + "', " + mysql.escape(req.body.aid) + ", '" + req.session.username + "')";
        connection.query(sql, [], function(error,questions,fields){
        if (error) throw error;
       
        res.redirect(req.get('referer'));
      
        });
  }
});

app.post('/markasresolved',async function(req,res){

  let results = await markAsResolved(req.body.qid);
  res.redirect(req.get('referer'));

});

//});
app.get('/logout', function(req,res){
  
  req.session.loggedin = false;
  req.session.username = null;
  res.redirect("/");


});
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM Users WHERE username = ? AND upassword = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
        request.flash("success","Hello, " + username + "!");
				response.redirect('/');
			} else {
	//			response.send('Incorrect Username and/or Password!');
        request.flash("error","Incorrect username or password");
        response.redirect('/login');
  
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.listen(3000,function(){
	console.log("listening here");
});
