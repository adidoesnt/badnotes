MATCH (m) DETACH DELETE m;

CREATE (a:USER {username: "adi", uuid: randomUUID()})
CREATE (b:USER {username: "akaash", uuid: randomUUID()})
CREATE (a) - [:IS_FRIENDS_WITH] -> (b)
CREATE (b) - [:IS_FRIENDS_WITH] -> (a)
CREATE (c:NOTE {title: "Hello world!", content: "This is my first note.", uid: randomUUID()})
CREATE (d:NOTE {title: "Hello again!", content: "I'm back with my second note!", uid: randomUUID()})
CREATE (e:NOTE {title: "Looking for friends", content: "Time to add some friends!", uid: randomUUID()})
CREATE (a) - [:WROTE {time: localdatetime()}] -> (c)
CREATE (a) - [:WROTE {time: localdatetime()}] -> (d)
CREATE (b) - [:WROTE {time: localdatetime()}] -> (e);
