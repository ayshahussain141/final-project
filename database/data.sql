insert into "users" ("userId", "userName", "hashedPassword")
values(1, 'welcome', '$argon2id$v=19$m=4096,t=3,p=1$4DQBlvLvbxX53tnf9JWfiA$ugQ+LbmRu0c+ff3ixd1U7Pz8jm6IdVacbu37GL3Hfjg');

insert into "courseEntries" ("courseName", "colorCode", "userId")
values('JavaScript', 'blue', 1);

insert into "assignments" ("assignment", "about", "dateDue", "isCompleted" ,"courseId")
values('Finish project', 'work on your final project', '01/22/22', false, 1);
