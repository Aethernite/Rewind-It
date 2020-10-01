INSERT INTO timesheet_application_database.projects(name) VALUES ('MentorMate L&D : 2020.2.Devcamp');
INSERT INTO timesheet_application_database.projects(name) VALUES ('MentorMate L&D : Client Satisfaction & Communication Part 1 Training');
INSERT INTO timesheet_application_database.projects(name) VALUES ('MentorMate L&D : Client Satisfaction & Communication Part 2 Training');
INSERT INTO timesheet_application_database.projects(name) VALUES ('MentorMate : Time off');
INSERT INTO timesheet_application_database.projects(name) VALUES ('MentorMate : Internal');

INSERT INTO timesheet_application_database.tasks(name) VALUES ('LEARNING');
INSERT INTO timesheet_application_database.tasks(name) VALUES ('ADMINISTRATIVE');
INSERT INTO timesheet_application_database.tasks(name) VALUES ('TRAINING');
INSERT INTO timesheet_application_database.tasks(name) VALUES ('RESEARCH');
INSERT INTO timesheet_application_database.tasks(name) VALUES ('BENCH_TIME');
INSERT INTO timesheet_application_database.tasks(name) VALUES ('MATERNITY_LEAVE');

INSERT INTO projects_tasks(project_id,tasks_id) VALUES(1,1);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(1,2);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(2,1);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(2,2);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(3,1);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(3,2);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(4,6);
INSERT INTO projects_tasks(project_id,tasks_id) VALUES(5,5);
