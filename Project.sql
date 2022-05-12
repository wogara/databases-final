drop table if exists Likes;
drop table if exists Users;

drop table if exists Answers;
drop table if exists Questions;
drop table if exists Subtopics;
drop table if exists Topics;

create table Users(
    username varchar(25) primary key,
    upassword varchar(25) not null,
    first_name varchar(124) not null,
    last_name varchar(124) not null,
	email varchar(24) not null,
    city varchar(24) not null,
    state varchar(24) not null,
    country varchar(30) not null,
    user_status varchar(12), 
    uprofile varchar(30) not null	
    
);

create table Topics(
	Tid varchar(3) primary key,
    topic_name varchar(24) not null

);

create table Subtopics(
	Tid varchar(3),
    subtopic_name varchar(24),
    primary key (Tid,subtopic_name), 
    foreign key (Tid) references Topics(Tid)

);



create table Questions(
    Qid varchar(3) primary key,
    username varchar(124) not null,
    title varchar(124) not null,
    body varchar(224) not null,
    date_posted date not null,
    time_posted time not null,
    Tid varchar(3) not null, 
    subtopic_name varchar(24),
    resolved boolean not null,
    foreign key (Tid) references Topics(Tid),
    foreign key (Tid,subtopic_name) references Subtopics(Tid,subtopic_name)
);

create table Answers(
    Aid varchar(3) primary key,
    Qid varchar(3) not null,
    username varchar(124) not null,
    body varchar(224) not null,
    date_posted date not null,
    time_posted time not null,
    best_answer boolean not null,
	foreign key (Qid) references Questions(Qid)
);

create table Likes(
	Lid varchar(3) primary key,
    Aid varchar(3),
    LikerUsername varchar(25),
    foreign key (Aid) references Answers(Aid),
    foreign key (LikerUsername) references Users(username)

);

INSERT INTO Users(username, upassword, first_name, last_name, email, city, state, country, user_status, uprofile) VALUES ('jimmy','password','James','Johnson','jimmyj@gmail.com', 'new york', 'ny', 'us','novice','hey i am jimmy and i love you');
INSERT INTO Users(username, upassword, first_name, last_name, email, city, state, country, user_status, uprofile) VALUES ('lauryn','password','Lauryn','Hill','lauryn@gmail.com', 'san francisco', 'ca', 'us','novice','hey i am lauryn');
INSERT INTO Users(username, upassword, first_name, last_name, email, city, state, country, user_status, uprofile) VALUES ('gavin','password','Gavin','McGavin','gavin@gmail.com', 'dallas', 'tx', 'us','novice','hey i am gavin');


Insert INTO Topics(Tid, topic_name) Values ('T1','computer science');
Insert INTO Topics(Tid, topic_name) Values ('T2','math');
Insert INTO Topics(Tid, topic_name) Values ('T3','history');
Insert INTO Topics(Tid, topic_name) Values ('T4','politics');
Insert INTO Subtopics(Tid,subtopic_name) Values ('T1', 'databases');
Insert INTO Subtopics(Tid,subtopic_name) Values ('T1', 'basics');

Insert INTO Subtopics(Tid, subtopic_name) Values ('T2', 'algebra');
Insert INTO Subtopics(Tid, subtopic_name) Values('T3','american');

Insert INTO Questions(Qid, username, title, body, date_posted, time_posted, Tid, subtopic_name, resolved) Values ('Q1','jimmy','for loops was awesome?','how do i write a for loop', '2022-03-12','12:12:15','T1','basics',false);
Insert INTO Questions(Qid, username, title, body, date_posted, time_posted, Tid, subtopic_name, resolved) Values ('Q2','lauryn','was george washington?','was he cool?', '2022-03-15','11:11:14', 'T3','american',false);
Insert INTO Questions(Qid, username, title, body, date_posted, time_posted, Tid, subtopic_name, resolved) Values ('Q3','lauryn','who was abraham lincoln??','was he nice?', '2022-03-15','10:10:13','T3','american',false);
Insert INTO Questions(Qid, username, title, body, date_posted, time_posted, Tid, subtopic_name, resolved) Values ('Q4','jimmy','sql inserts','how ot insert to a table that was built', '2022-03-15','09:09:09','T1','databases',false);

Insert INTO Answers(Aid, Qid, username, body, date_posted, time_posted, best_answer) Values ('A1','Q1','lauryn','figure it out dummy', '2022-03-15','12:12:15',false);
Insert INTO Answers(Aid, Qid, username, body, date_posted, time_posted, best_answer) Values ('A2','Q2','jimmy','yeah he was awesome!', '2022-03-22','11:11:14',true);
Insert INTO Answers(Aid, Qid, username, body, date_posted, time_posted, best_answer) Values ('A3','Q2','gavin','meh he was whatever', '2022-03-25','10:10:13',false);

Insert INTO Likes(Lid, Aid, LikerUsername) Values ('L1','A2', 'lauryn');
Insert INTO Likes(Lid, Aid, LikerUsername) Values ('L2','A3', 'lauryn');
Insert INTO Likes(Lid, Aid, LikerUsername) Values ('L3','A2', 'gavin');
