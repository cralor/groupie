const GROUPMETOKEN = process.env['GROUPMETOKEN'];
const GIPHYTOKEN = process.env['GIPHYTOKEN'];
const GROUP = process.env['GROUP'];
const URL = process.env['URL'];
const natural = require('natural');
const _ = require('underscore');
const util = require('util');
const request = require('request');
const image = require('google-images');

var tokenizer = new natural.WordTokenizer();

var config =  { token:GROUPMETOKEN,
                name: "groupie",
                group: GROUP,
                url: URL
              };

const AVATAR = process.env['AVATAR'];
if (AVATAR) {
  config.avatar_url = AVATAR;
}

var giphy = require('giphy-wrapper')(GIPHYTOKEN);
var bot = require('fancy-groupme-bot')(config);
var hedberg = ["I love blackjack. But I'm not addicted to gambling. I'm addicted to
   sitting in a semicircle.","I tried to have a cookie, and this girl said, 'I'm mailing those cookies
   to my friend.' So I couldn't have one. You shouldn't make cookies
   untouchable.","I drank some boiling water because I wanted to whistle.","A lollipop is a cross between hard candy and garbage.","Has anyone seen me on Letterman? Two million people watch that show and I
   don't know where they are. You might have seen this next comedian on the
   Late Show, but I think more people have seen me at the store. That should
   be my introduction. 'You might have seen this next comedian at the store,'
   and people would say 'Hell yes I have!'","It's hard to fight when you're in a gazebo.","I don't like grouper fish. Well, they're okay. They hang around star fish.
   Because they're grouper fish.","I have some speakers up here, thank God, because last night I didn't have
   them and I was telling jokes and I had no idea which joke I was telling.
   So I told jokes twice. I even told that one twice.","I've got a wallet, it's orange. In case I wanna buy a deer. That doesn't
   make any sense at all.","I miss the $2 bill, 'cause I can break a two. $20, no. $10, no. $5, maybe,
   $2? Oh yeah. What do you need, a one and another one?","I called the hotel operator and she said, 'How can I direct your call?' I
   said, 'Well, you could say 'Action!', and I'll begin to dial. And when I
   say 'Goodbye', then you can yell 'Cut!''","A dog came to my door, so I gave him a bone, the dog took the bone into
   the back yard and buried it. I'm going to go plant a tree there, with
   bones on it, then the dog will come back and say, 'Shoot! It worked! I
   must distribute these bones equally for I have a green paw!'","Cavities are made by sugar. So if you need to dig a hole, then lay down
   some candy bars!","I like cottage cheese. That's why I want to try other dwelling cheeses,
   too. How about studio apartment cheese? Tent cheese? Mobile home cheese?
   Do not eat mobile home cheese in a tornado.","I'm an ice sculptor. Last night I made a cube.","I went to the airport, I put my bag in the x-ray machine, I found out my
   bag has cancer. It only has six more months to hold stuff.","That would be cool if the earth's crust was made out of graham cracker. It
   would disappear just like the ozone layer, but for completely different
   reasons.","I want to get non-aerosol mace, you just rub it in. 'Dude who is attacking
   me - come a little closer!'","Magicians disappear all the time, but as soon as a regular person does it,
   everyone is all scared. 'Tom's gone!' 'Is he a magician?' 'No.' 'Then
   let's print up some flyers!'","I tried to throw a yo-yo away. It was impossible.","A sleeping bag is a tortilla for a human.","I rented a car. I didn't really need one, I just wanted to make one less
   available. I wanted one businessman on the bus with no car.","My manager said, 'Don't use liquor as a crutch!' I can't use liquor as a
   crutch, because a crutch helps me walk.","I went to a restaurant, and I saw a guy wearing a leather jacket, eating a
   hamburger, drinking a glass of milk. I said, 'Dude, you are a cow. The
   metamorphosis is complete. Don't fall asleep or I will tip you over!'","My girlfriend works at Hooters. In the kitchen.","I've never been to a hotel with a rotating restaurant on top, but one time
   I took my girlfriend to a merry-go-round, and I gave her a burrito.","I want to get a vending machine, with fun sized candy bars, and the glass
   in front is a magnifying glass. You'll be mad, but it will be too late.","I think a rotisserie is a really morbid Ferris wheel for chickens. We will
   take a chicken, impale it, and then rotate it. Spinning chicken carcasses
   make my mouth water. I like dizzy chickens!","Some comics get drunk before a show. I don't. When I get drunk, I don't
   want to stand in front of a bunch of people that I don't know. That does
   not sound comfortable. Why have all these people gathered? And why am I
   elevated and not facing the same way as everyone else? And what is this
   electric stick in my hand? I want a chair too!","This one guy said, 'Look at that girl. She's got a nice butt.' I said,
   'Yeah, I bet she can sit down excellently!'","I would imagine the inside of a bottle of cleaning fluid is really clean.
   I would imagine a vodka bottle is really drunk.
   I want to ride in a cold air balloon. 'This isn't going anywhere!'","Tony the Tiger usually thinks that stuff is great.","I can whistle with my fingers, especially if I have a whistle.","This one commercial said, 'Forget everything you know about slipcovers.'
   So I did, and it was a load off of my mind. Then the commercial tried to
   sell slipcovers, but I didn't know what they were!","I'm into carpooling, because sometimes my car gets hot and needs to
   refresh itself.","Imagine if you were a drummer, and you accidentally picked up two magic
   wands instead of sticks. There you are, keeping the beat, the next thing
   you know, your bass player turns into a can of soup.","I'm a hard act to follow, because when I'm done, I take the microphone
   with me.","Why is Cloud 9 so amazing? What is wrong with Cloud 8? That joke came off
   the top of my head, and the top of my head ain't funny!","I wear a necklace now because I like to know when I'm upside down.","I read that MTV's Real World got 40,000 applications. That's amazing, such
   an even number. You would have thought it would be 40,008.","I bought a scratch off lottery ticket, but then I accidentally spilled
   calamine lotion on it, so it did not need to be scratched. Shoot! I will
   not know if I have won!","I ate one anchovy, and that is why I did not eat two anchovies.","As a comedian, you have to start the show strong and you have to end the
   show strong. Those are the two key elements. You can't be like pancakes.
   You're all happy at first, but then by the end, you're sick of 'em.","I saw a billboard for the lottery. It said, 'Estimated lottery jackpot 55
   million dollars.' I did not know that was estimated. That would suck if
   you won and they said, 'Oh, we were off by two zeroes. We estimate that
   you are angry.'","I wish they made fajita cologne, because that stuff smells good. What's
   that you're wearing? That's sizzlin'!","I have an idea for sweatshops: air conditioning! That's simple. 14 year
   old boys working twelve hour days? 'Yeah, but they're comfortable!'","I spilled some vodka on the carpet, and I vacuumed it up, and the vacuum
   got drunk. I had to take the Hoover to detox.","If you can't sleep, count sheep. Don't count endangered animals. You will
   run out.","A fly was very close to being called a land, because that's what it does
   half the time.","I want to rob a bank with a BB gun. 'Give me all your money or I will give
   you a dimple! I will be rich, you will be cute. We both win.'","I had a chicken finger that was so big, it was a chicken hand.","I got binoculars 'cause I don't want to go that close.","I can read minds, but I'm illiterate.","If Spiderman was real, and I was a criminal, and he shot me with his web,
   I would say, 'Dude, thanks for the hammock.'","I got a belt on that's holding up my pants, and the pants have belt loops
   that hold up the belt. What's going on here? Who is the real hero?","I had the cab driver drive me here backwards, and the dude owed me $27.50.","Kittens play with yarn, they bat it around. What they're really doing is
   saying, 'I can't knit, get this away from me!'","I met this girl, she was an actress, and she gave me her number. It
   started with 555.","If you don't know a light bulb is a three-way light bulb, it messes with
   your head. You reach to turn it off, and it just gets brighter! That's the
   exact opposite of what I wanted you to do! So you turn the switch again,
   and it gets brighter once more! I will break you, light bulb!","I went to a restaurant with my friend, and he said, 'Pass the salt.' I
   said, 'Screw you! Sit closer to the salt.'","Imagine if the headless horseman had a headless horse. That would be
   chaos. I would think that if you were the headless horseman's horse, you
   would be very confused. 'I don't think this dude can see.'","You know when you see an advertisement for a casino, and they have a
   picture of a guy winning money? That's false advertising, because that
   happens the least. That's like if you're advertising a hamburger, they
   could show a guy choking. 'This is what happened once.'","I was on a bus once, it was in the middle of the night, and I had a box of
   crackers and a can of Easy Cheese. It was dark, and it was a surprise how
   much cheese I had applied on each cracker. That's why they should have a
   glow-in-the-dark version of Easy Cheese. It's not like the product has any
   integrity to begin with. If you buy a room-temperature cheese that you
   squeeze out of a can, you probably won't get mad because it glows in the
   dark too.
   I have a Sharpie. I love Sharpies. You know what they say on them? Not for
   letter writing. That sucks. Now I have to communicate with my dad using
   numbers.","Comedy clubs have brick walls behind the performer. Bricks make you funny.
   When I'm in front of a fireplace, I'm hilarious.","I got two stools, in case I want to sit down and sit down again on
   something else.","If a drink was ice cold, it would be impossible to drink. Because it would
   be solid. Here's a drink, Mitch - it's ice cold. I guess I could lick it.","Knock on wood is a saying for good luck. I think that started when someone
   went to someone's door to see if someone was home. 'I hope Joe's home,
   knock on wood!'","I wanted to get a tape recorder, but I got a parrot instead. I think I did
   that joke backwards.","I don't get the regular AIDS test anymore. I get the roundabout AIDS test.
   I ask my friend Brian, 'Do you know anybody who has AIDS?'. He says, 'No'.
   I say, 'Cool, because you know me.'","I put fruit on top of my waffles, because I want something to brush off.","People ask me for my autograph after a show. I'm not famous, I think
   they're messing with me. I think they're trying to make me late for
   something.","I saw a lady on TV, she was born without arms. That's sad, but then they
   said, 'Lola does not know the meaning of the word 'can't'.' That, to me,
   is even worse in a way. Not only is she missing arms, but she doesn't
   understand simple contractions. It's easy, Lola - you just take two words,
   put them together, take out the middle letters, put in a comma, and you
   raise it up!","If I'm out to dinner with a group of friends, and somebody offers to pay
   for the check, I immediately reach for my wallet. Inside is a note that
   says, 'Say thanks!'","I did a radio interview; the DJ's first question was 'Who are you?' I had
   to think. Is this guy really deep, or did I drive to the wrong station?","I like when they say a movie is inspired by a true story. That's kind of
   silly. 'Hey, Mitch, did you hear that story about that lady who drove her
   car into the lake with her kids and they all drowned?' 'Yeah, I did, and
   you know what - that inspires me to write a movie about a gorilla!'","I like it when you buy something and pay with a credit card, they put your
   credit card on the receipt, but only the last four numbers. Aha! I'm
   really good at guessing twelve numbers. I can't guess 16 numbers, so
   thanks for the assistance!","XM radio doesn't have commercials, so after about thirty minutes of
   listening to it, I'm like, 'What should I buy?'","If you have to release bad news to the public, it would help if you are
   not ugly.","I saw a seagull hanging out by a lake, but I said, 'Don't worry, Dude. I
   won't say anything.'","Fettuccini Alfredo is macaroni and cheese for adults.","I tried to freshen up a room, so I held a Certs in front of a fan.","Snake eyes is a gambling term, and an animal term, too.","I like those blow-up beds. 'This becomes a full size bed in three
   minutes!' Well, a mattress kicks your ass. Zero seconds. 'Yeah, but you
   can store this thing.' You can store a bed, too - in the bedroom.","I make myself a bowl of instant oatmeal, and then I don't do anything for
   an hour. Why do I need the instant oatmeal? I could get the regular
   oatmeal and feel productive.","My girlfriend is named Lynn. She spells her name 'Lynn'. My old
   girlfriend's name is Lyn, too, but she spells it 'Lyn'. Every now and then
   I screw up, I call my new girlfriend by my old girlfriend's name, and she
   can tell because I don't say 'n' as long.","When you're doing a show on stage, and they show you a red light, that
   means you have 5 minutes left. At some clubs, they hold a candle up in the
   back. That's the worst method. You're up here, and then you see a floating
   candle. 'Oh, no! This place is haunted!' I can't be funny when I'm
   frightened.","I was at a concert in LA, and the band was having an off night, and some
   people in the audience started throwing tomatoes at the band. Now who
   would throw tomatoes at the band? That's bad. But who would bring a tomato
   to a show? That's worse. Don't throw tomatoes at the band. What if they
   really like tomatoes? They'll think you're enjoying the show. 'You guys
   are great - here's a tomato!' The tomato is the universal sign for not
   enjoying a performance. Plus I like it on sandwiches! I had the guy at
   Subway put tomatoes on my sandwich because I didn't like the way he was
   making it. I don't know what that meant there. That was ad-libbed.","I saw soda pop for $1.20 a six pack. That price messes with your head. You
   start thinking you're gonna sell soda pop. Suddenly I've got packs of pop
   with me. 'Looking to buy some pop? 50 cents a can. It's not refrigerated
   because this is a half-assed commitment!'","A friend said to me, 'I think the weather is trippy.' I said, 'No, man,
   it's not the weather that's trippy, perhaps it's the way we perceive it.'
   And then I realized I just should have said, 'Yeah.'
   I like Kinko's, because they're open 24 hours. If it's 5 am and I decide I
   need two of something, I'm covered! Sometimes I wake up in the middle of
   the night in a cold sweat, and then I think, 'Oh, yeah. Kinko's. No
   problem. That will not remain singular.'","A friend gave me a drug for attention deficit disorder, because he's
   afflicted, but I'm not. So what happened to me is I suddenly had an
   extra-long attention span. People would tell me a story, and it would end,
   and I'd get all mad. 'Come on, man, there has to be more to that story.'","I have a friend who is a juggler. If I'm at his house, I don't like to
   take food from him, if it's in threes. He has three apples left, I guess I
   can't have one. I wouldn't want to screw up his practice routine.","I'm a mumbler. If I'm walking with a friend, and I say something, he says,
   'What?' So I say it again, and he says, 'What?' Really, it's just some
   insignificant stuff I'm saying, but now I'm yelling, 'That tree is far
   away!'","I was booked into the Riviera Hotel in Las Vegas with three other
   comedians. We all were using the Riviera in-house shampoo, so we all had
   equal shine and bounce.","I was walking down the street with a friend, and he said, 'I hear music.'
   As if there was any other way you can take it in. That's how I receive it
   too. You're not special.","I made $3,000 opening for the Neville Brothers, and they paid me in cash.
   That was a bad situation, because I bought ridiculous stuff. I bought a
   snake bite emergency kit. Then I said to my friends, 'Don't even worry
   about snakes anymore'. My friend stepped on a worm, and I said, 'Lay
   down!'","I sometimes close my eyes during a show because I have drawn a picture of
   an audience enjoying the show more on the back of my eyelids.","I have a roommate, and I signed a year lease. I screwed up! That's like I
   wrote a joke that didn't work, but now I have to tell it for a year.","A guy came up to me in the airport, saying, 'Dude, I saw you on TV last
   night!' But he did not say whether or not he thought I was good. He just
   confirmed I was on television. So I turned away for a minute, and then I
   turned back toward him and said, 'I saw you at the airport about a minute
   ago. And you were good!'","You should never tell someone they have a nice dimple, because maybe they
   were shot in the face with a BB gun.","I had my palm read. I wrote something on it first to see if she would read
   that too.","I have a few cavities. I don't like to call them cavities. I like to call
   them 'places to put stuff.' Do you know where I can store a pea? Yes, I
   have some locations available.","I can't eat spaghetti. There's too many of them.","I heard a guy tell me he liked cherries. I waited to hear if he was going
   to say 'tomatoes', then I realized he like cherries just. That joke is
   ridiculous.","I've always wanted to have a suitcase handcuffed to my wrist. That's not a
   full joke there! It's filler.","Swiss cheese is the only cheese you can draw and people can identify. You
   can draw American cheese, but someone will think it's cheddar. It's the
   only cheese you can bite and miss. 'Hey Mitch - does that sandwich have
   cheese on it?' 'Every now and then!'","I went to a tent store. 'What kind of tent do you need?' 'Circus.'","I thought my teeth were white until I washed my face with Noxzema. My
   teeth are off-white. I'm not even white. I'm off-white. It's a new race;
   we will prevail!","I got a hotel room at New York New York in Las Vegas and I was very happy.
   They've got that rollercoaster encircling the entire premises, just like
   Manhattan.","When it comes to racism, you hear people say, 'I don't care if people are
   white, black, purple or green.' Hold on, now, purple or green? Come on
   now, you gotta draw the line somewhere.","Sometimes I get really lonely. Especially when I'm throwing a Frisbee.","I was going to stay overnight at my friend's house - he said, 'you'll have
   to sleep on the floor.' Damn gravity! You don't know how bad I wanted to
   sleep on the wall.","Dogs are forever in the push-up position.","I was in a convenience store, reading a magazine. The clerk told me, 'this
   is not a library!' 'OK! I will talk louder, then!'","I am wearing a vest. If I had no arms, it would be a jacket.","Advil has a candy coating. It's delicious. Then it says on the bottle, do
   not have more than two. Then why do they have a candy coating? I cannot
   help myself. Let me have ten Advil, I have a sweet tooth.","I was at a restaurant, and I ordered a chicken sandwich, but I don't think
   the waitress understood me. She asked me, 'How would you like your eggs?'
   I thought I would answer her anyway and said, 'Incubated! And then raised,
   plucked, beheaded, cut up, put onto a grill, and then put onto a bun.
   Damn! I don't have that much time! Scrambled!'
   I travel with a boom box. When I get on a plane, I stuff the power cord
   for the boom box into the battery compartment. From an outsider's point of
   view, it looks like I've got it all wrong.","I lived in an apartment, and I had a neighbor. I knew that whenever he
   knocked on the wall, he wanted me to turn my music down. I'd mess with his
   head. I'd say, 'Go around. I cannot open the wall!'","Last time I called shotgun we had rented a limo, so I messed up!","I'm always on the road, and I drive rental cars. Sometimes I don't know
   what's going on with the car, and I'll drive for ten miles with the
   emergency brake on. That doesn't say a lot for me, but it doesn't say a
   lot for the emergency brake. What kind of emergency is this? I need to not
   stop now. It's not really an emergency brake, it's an emergency
   make-the-car-smell-funny lever.","People associate long hair with drug use. I wish people associated long
   hair with something other than drug use, like an extreme longing for cake.
   And then strangers would see a long haired guy and say, 'That guy eats
   cake!' 'He is on bundt cake!' Mothers saying to their daughters, 'Don't
   bring the cake eater over here anymore. He smells like flour. Did you see
   how excited he got when he found out your birthday was fast approaching?'","You know you can't please all the people all the time, and last night, all
   of those people were at my show.","If I was a mechanic and someone called me and said their car would not
   start, I would say, 'Hey - maybe a killer is after you!'","I had to take a physical to do this show. They had a lot of weird
   questions like, 'Have you ever tried sugar or PCP?'","When you open the elevator on the top floor of a building and the other
   guy doesn't get out, something is seriously wrong.","When you're in Hollywood and you're a comedian, everybody wants you to do
   other things. All right, you're a stand-up comedian, can you write us a
   script? That's not fair. That's like if I worked hard to become a cook,
   and I'm a really good cook, they'd say, 'OK, you're a cook. Can you farm?'","I'm sick of following my dreams. I'm just gonna ask where they're going
   and hook up with them later.","I wanted to buy a candle holder, but the store didn't have one. So I
   bought a cake.","I can't wait to get off the stage, because I've got some LifeSavers in my
   pocket and pineapple is next!","I went to a heavy metal concert. The singer yelled out, 'How many of you
   people feel like human beings tonight?' And then he said, 'How many of you
   feel like animals?' The thing is, everyone cheered after the animals part,
   but I cheered after the human beings part because I did not know there was
   a second part to the question.","I would like it if four people did a cartwheel all at once... so I can
   make a cart.","I like baked potatoes. I don't have a microwave oven, and it takes forever
   to bake a potato in a conventional oven. Sometimes I'll just throw one in","there, even if I don't want one, because by the time it's done, who knows?","I bought myself a parrot, but it did not say 'I'm hungry', and so it died.","I had a box of Ritz crackers, and on the back of the box, they had all
   these suggestions for what to put on top of the Ritz. Try it with cheese.
   Try it with peanut butter. Come on, man, they're crackers, that's why I
   got them. I like crackers! I didn't buy them because they're little edible
   plates!","I don't have a girlfriend. But I do know a woman who'd be mad at me for
   saying that.","I thought I'd go to a craft fair, and there would be a jar of jellybeans
   there - 'Guess how many jellybeans are in this jar, and win a prize'. Aw,
   come on, man, let just me have some. I'll tell you what, guess how many
   jellybeans I want! If you guessed a handful, you are right.","One time I stayed at a haunted motel. When I checked into my room, there
   was a sheet on the floor, and I thought it was a ghost that had passed
   out, so I kicked it.","My sister Wendy has a husband and two children, and they have a family
   photo on top of the VCR, where they're all looking slightly to the left.
   As though something is going on over there! I guess something happened
   over to the left that made everybody happy! Except my sister is
   cross-eyed, so she can't quite pull it off. One eye is right-on.","When I get a cold sore, I put Carmex on it, because Carmex is supposed to
   alleviate cold sores. I don't know if it does help, but it will make them
   more shiny and noticeable. It's like cold-sore-highlighter. Maybe they
   could come up with an arrow that heals cold sores.","I hate turkeys. If you go to the grocery store, you start to get mad at
   turkeys. You see turkey ham, turkey bologna, turkey pastrami. Somebody
   just needs to tell the turkeys, 'Man, just be yourselves!' I already like
   you, little fella. I used to draw you. If you had a couple of fingers
   missing, you would draw a really messed-up turkey. That turkey was in an
   accident!","I hate arrows. They try to tell me which direction to go. It's like 'I
   ain't going that way, line with two thirds of a triangle on the end!'","When you go to a bar that has a black light, everybody looks cool. Except
   for me, because I was under the impression that the mustard stain came
   out.
   Imagine if an bow and arrow killed you. That would suck. An arrow killed
   you? They would never solve the crime. 'Look at that dead guy. Let's go
   that way.'","Pizza Hut will accept other pizzeria's coupons. That makes me wish I had
   my own pizza place. Mitch's Pizza - this weeks' coupon: free unlimited
   pizza! Special note: coupon not valid at any of Mitch's Pizza locations.
   'Free pizza oven with purchase of a small coke.'","I type a 101 words a minute. But it's in my own language.","Whenever I walk somewhere, and someone hands me a flyer, it's like they're
   telling me, 'Here, you go throw this away.'","I like to hold the microphone cord like this, I pinch it together and then
   I let it go, then you hear a whole bunch of jokes all at once.","I can't floss my teeth. People tell me how hard it is to stop smoking; I
   think it's about as hard as it is to start flossing.","A severed foot is the ultimate stocking stuffer.","I played in a death-metal band. People either loved us or hated us. Or
   they thought we were OK.","I tried to walk into Target, but I missed. I think the entrance to Target
   should have people splattered all around.","A lot of bands have intense names, like 'Rigor Mortis' or 'Mortuary'. We
   weren't that intense, we called ourselves 'Injured'. Later on we changed
   it to 'Acapella' when we were walking out of the pawn shop.","I had a stick of Carefree gum, but it didn't work. I felt pretty good
   while I was blowing that bubble, but as soon as the gum lost its flavor, I
   was back to pondering my mortality.","I went to a cigar store, the man behind the counter asked me, 'What kind
   of cigars do you like?' I answered, 'It's a Boys.'","I hate dreaming. Because when you sleep, you wanna sleep. Dreaming is
   work, you know - there I am in a comfortable bed, the next thing you know
   I have to build a go-kart with my ex-landlord. I want a dream of me
   watching myself sleep.","I was at a bar, and this guy bumped into me, and he did not apologize, and
   he said, 'Move!' I thought that was rude, so I said, 'Go to hell!' Then I
   started to run. He caught up to me. He had a mustache, a goatee, a pair of
   earrings, sunglasses, a ponytail and he was wearing a hat. He said, 'Hey,
   you got a lot of nerve!' I said, 'Hey, you got a lot of... cranium
   accessories!'","I want to be a race car passenger: just a guy who bugs the driver. 'Say
   man, can I turn on the radio? You should slow down. Why do we gotta keep
   going in circles? Can I put my feet out the window? Boy, you really like
   Tide.'","When I was on acid, I would see things like beams of light. And I would
   hear things that sounded an awful lot like car horns.","I went to the Home Depot, which was unnecessary. I need to go to the
   Apartment Depot. Which is just a big warehouse with a whole lot of people
   standing around saying 'We don't have to fix anything.'","When we were on acid, we would go into the woods, because there was less
   chance that you would run into an authority figure. But we ran into a
   bear. My friend Duane was there, raising his right hand, swearing to help
   prevent forest fires. He told me, 'Mitchell, Smokey is way more intense in
   person!'","I got in an argument with a girlfriend inside of a tent. That's a bad
   place for an argument, because when I tried to walk out, I had to slam the
   flap. How are you supposed to express your anger in this situation? Zip it
   up real quick?","Is a hippopotamus just a really cool opotamus?","I went to England to tell jokes, and I wanted to tell my Smokey the Bear
   joke, but I had to ask the English people if they knew who Smokey the Bear
   is. But they don't. In England, Smokey the Bear is not the
   forest-fire-prevention representative. They have Smackie the Frog. It's a
   lot like a bear, but it's a frog. And that's a better system, I think we
   should adopt it. Because bears can be mean, but frogs are always cool.
   Never has there been a frog hopping toward me and I thought, 'Man, I
   better play dead!'","The only way I could get my old CD into stores is if I took one in and
   leave it. 'Sir, you forgot this.' 'No, I did not. That is for sale. Please
   alphabetize it.'","I wear V-neck shirts. I can't wear a regular neck shirt, it hurts. And I
   especially hate turtlenecks. Wearing a turtleneck is like being strangled
   by a really weak guy. All day! If you wear a backpack and a turtleneck,
   it's like a weak midget trying to bring you down.","I think Bigfoot is blurry, that's the problem. It's not the photographer's
   fault. Bigfoot is blurry. And that's extra scary to me, because there's a
   large, out-of-focus monster roaming the countryside. Run. He's fuzzy. Get
   outta here!","You know when you go into a restaurant, and it gets busy and they start a
   waiting list, and they start calling out names, 'DuFresnes, party of two.'
   They say again, 'DuFresnes, party of two.' But then if no one answers,
   they'll just go to the next name, 'Bush, party of three.' Yeah, but what
   happened to the DuFresnes? No one seems to care. Who can eat at a time
   like this? People are missing! And they're hungry! That's a double whammy!
   'Bush, search party of three!' You can eat once you find the DuFresnes!","I cannot tell you what hotel I'm staying at, but there are two trees
   involved.
   I wrote a script, and I gave it to a guy who reads scripts, and he really
   likes it, but he thinks I need to rewrite it. I said, 'Screw that, I'll
   just make a copy!'","My sister wanted to be an actress, but she never made it. She does live in
   a trailer; she made it half-way. She's an actress, she just never gets
   called to the set.","I have a 'Do Not Disturb' sign on my hotel door. It's time to go to 'Don't
   Disturb'. It's been 'Do Not' for too long. We should embrace the
   contraction.","I'm against picketing, but I don't know how to show it.","I like to wear a 'Do Not Disturb' sign around my neck so that little kids
   can't tell me knock-knock jokes. 'Hey, how ya doin'? Knock-knock.' 'Read
   the sign, punk!'","If carrots got you drunk, rabbits would be screwed up.","I met the girl who works at the Doubletree front desk, she gave me her
   number. It's ZERO. I tried to call from here, some other woman answered.
   'You sound older!'","I like vending machines, because snacks are better when they fall. If I
   buy a candy bar in a store, sometimes I will drop it so it will reach its
   maximum flavor potential.","If 13 is unlucky, then 12 and 14 are guilty by association.","2-in-1 is a stupid term, because 1 is not big enough to hold 2. That's why
   2 was created.","They say the recipe for Sprite is lemon and lime. I tried to make it at
   home. There's more to it than that.","I know a lot about cars. I can look at a car's headlights and tell you
   exactly which way it's coming.","I like refried beans. That's why I wanna try fried beans. Maybe they're
   just as good, and we're not wasting time.","A lot of people don't know it, but onions make me sad!","This shirt is dry clean only. Which means it's dirty.","I hate sandwiches at New York delis. Too much meat on the sandwich. It's
   like a cow with a cracker on either side. 'Would you like anything else
   with the pastrami sandwich?' 'Yeah, a loaf of bread and some other
   people!'","At my hotel room, my friend came over and asked to use the phone. I said
   'Certainly.' He said 'Do I need to dial 9?' I say 'Yeah. Especially if
   it's in the number. You can try 4 and 5 back to back real quick.'","I ordered a club sandwich, but I'm not even a member. 'I like my
   sandwiches with three pieces of bread.' 'Well, so do I!' 'Then let's form
   a club.' 'OK, but we need some more stipulations. Instead of cutting the
   sandwich once, let's cut it again. Yes, four triangles, arranged in a
   circle, and in the middle we will dump chips.' 'How do you feel about
   frilly toothpicks?' 'I'm for 'em!' 'Well, this club is formed.'","My lucky number is four billion. That doesn't come in real handy when
   you're gambling. 'Come on, four billion! Darn! Seven. Not even close. I
   need more dice.'","I went to a pizzeria. The guy gave me the smallest slice possible. If the
   pizza was a pie chart with what would you do if you found a million
   dollars, he gave me the 'Donate it to charity' slice. 'I'd like to
   exchange this for the 'Keep it!''","I saw this wino, he was eating grapes. I said, 'Dude, you have to wait.'","I don't own a cell phone or a pager. I just hang around everyone I know,
   all the time.","I used to drink wine. This girl asked me, 'Doesn't wine give you a
   headache?' 'Yeah, eventually, but the first and the middle part are
   amazing!'","I think foosball is a combination of soccer and shish kabobs. Foosball
   screwed up my perception of soccer. I thought you had to kick the ball and
   then spin round and round. I can't do a back flip, much less several,
   simultaneously with two other guys who look just like me.","I went to the store and bought eight apples; the clerk said, 'Do you want
   these in a bag?' I said, 'Oh, no, man, I juggle.'","I used to do drugs. I still do drugs. But I used to, too.","I saw a guy juggling chain saws, it was cool, unless something needed to
   be sawed down, then it's annoying.","The thing about tennis is: no matter how much I play, I'll never be as
   good as a wall. I played a wall once. They're relentless.","I was going to get my teeth whitened, but I said, 'I'll just get a tan
   instead.'","I think Pringles initial intention was to make tennis balls. But on the
   day that the rubber was supposed to show up, a big truckload of potatoes
   arrived. But Pringles is a laid back company. They said, 'Screw it. Cut
   'em up!'","I got some tartar control toothpaste. I still have tartar, but that
   stuff's under control. I got so much tartar, I don't have to dip my fish
   sticks in anything. That's actually kind of gross. After that joke, I have
   to clarify that I'm just joking.
   An escalator can never break: it can only become stairs. You would never
   see an 'Escalator Temporarily Out Of Order' sign, just 'Escalator
   Temporarily Stairs. Sorry for the convenience.'","I would like to go fishing and catch a fish stick. That would be
   convenient. I could easily get a job at Mrs. Paul's.","Because of acid, I now know that butter is way better than margarine.","You know when they have a fishing show on TV? They catch the fish and then
   let it go. They don't want to eat the fish, but they do want to make it
   late for something. 'Where were you?' 'I got caught!' 'I don't believe
   you, let me see the inside of your lip.'","So, I sit at the hotel at night and I think of something that's funny. Or,
   if the pen is too far away, I have to convince myself that what I thought
   of ain't funny.","You know crazy straws - they go all over the place? These straws are sane.
   They never lost their mind. They say, 'we're going straight to the mouth.
   That guy who takes a while to get there? He's crazy.'","You know that Pepperidge Farm bread, that stuff is fancy. That stuff is
   wrapped twice. You open it, and then still ain't open. That's why I don't
   buy it, I don't need another step between me and toast.","I like it when you reach into a vending machine to grab your candy bar,
   and that flap goes up to block you from reaching up? That's a good
   invention. Before that, it was hard times for the vending machine owners.
   'Yeah, what candy bar are you getting?' 'That one, and every one on the
   bottom row!'","This product that was on TV was available for four easy payments of
   $19.95. I would like a product that was available for three easy payments
   and one complicated payment. We can't tell you which payment it is, but
   one of these payments is going to be hard. The mailman will get shot, the
   envelope will not seal, the stamp will be in the wrong denomination. The
   final payment must be made in wampum.","I want to make a vending machine that sells vending machines. It'd have to
   be real big.","I would imagine if you could understand Morse Code, a tap dancer would
   drive you crazy.","I was going to get a candy bar, the button I was supposed to push is HH.
   So I pressed the H button twice. Potato chips came out! Turns out there
   was an HH button. You gotta let me know. I'm not familiar with the concept
   of HH. I did not learn my AA BB CCs.","I don't wear a watch because I want my arms to weigh the same.","I get the Reese's candy bar. You look at that, there's an apostrophe-s
   there. That means the candy bar is his. I didn't know that. Next time
   you're eating a Reese's candy bar, and a guy named Reese comes by and
   says, 'Gimme that', you better hand it over.","I went to the park and saw this kid flying a kite. The kid was really
   excited. I don't know why, that's what they're supposed to do. Now if he
   had had a chair on the other end of that string, I would have been
   impressed.","The Kit Kat candy bar has the name Kit Kat imprinted into the chocolate.
   That robs you of chocolate! That's a clever chocolate-saving technique.","I played golf. I did not get a hole in one, but I did hit a guy. That's
   way more satisfying. You're supposed to yell, 'Fore!' I was too busy
   yelling, 'There ain't no way that's gonna hit him!'","If you want to talk to me after the show, I'd be surprised.","I saw a human pyramid once. It was very unnecessary.","If you find yourself lost in the woods, build a house. 'Well, I was lost,
   but now I live here!'","I haven't slept for ten days, because that would be too long.","I bought a house, it's a two bedroom house, but I think it's up to me to
   decide how many bedrooms there are. This bedroom has an oven in it. This
   bedroom has a lot of people sitting around watching TV. This bedroom is
   over in that other guy's house.","I bought a doughnut and they gave me a receipt for the doughnut. I don't
   need a receipt for the doughnut. I give you money and you give me the
   doughnut, end of transaction. We don't need to bring ink and paper into
   this. I can't imagine a scenario that I would have to prove that I bought
   a doughnut. To some skeptical friend, 'Don't even act like I didn't buy a
   doughnut, I've got the documentation right here. Oh, wait. It's in my file
   at home, under 'D''.","I have a king sized bed. I don't know any kings, but if one came over, I
   guess he'd be comfortable. 'Oh, you're a king, you say? Well, you won't
   believe what I have in store for you.'","A snake bite emergency kit is a body bag.","When I was a boy, I laid in my twin size bed, wondering where my brother
   was.","My roommate says, 'I'm going to take a shower and shave, does anyone need
   to use the bathroom?' It's like some weird quiz where he reveals the
   answer first.","I don't have a microwave oven, but I do have a clock that occasionally
   cooks stuff.
   I wrote my friend a letter with a highlighting pen, but he could not read
   it, he thought I was trying to show him certain parts of a piece of paper.","I want to get a job naming kitchen appliances. That seems easy;
   refrigerator, toaster, blender. You just say what the thing does and add
   'er'.","I use the word totally too much. I need to change it up and use a word
   that is different but has the same meaning. Mitch do you like submarine
   sandwiches? All-encompassingly!","I think pickles are cucumbers that sold out. They sold their soul to the
   devil, and the devil is dill.","At the end of a letter I like to write 'P.S. This is what part of the
   alphabet would look like if Q and R were eliminated.","I got my hair highlighted, because I felt some strands were more important
   than others.","I don't have a girlfriend. But I do know a woman who'd be mad at me for
   saying that.","My friend asked me if I wanted a frozen banana, I said 'No, but I want a
   regular banana later, so, Yeah.'","Mr. Pibb is a poor imitation of Dr. Pepper. Dude didn't even get his
   degree.","Sometimes I wake up and I think I should start wearing a beret, but I
   don't do it though. One day I'm gonna though. You bet, I will have a beret
   on. That's ridiculous, but it's true. I always fight with wearing a beret.","The commercial for Diet Dr. Pepper says it tastes just like regular Dr.
   Pepper. Well, then they screwed up!","A mini-bar is a machine that makes everything expensive. When I take
   something out of the mini-bar, I always fathom that I'll go and replace it
   before they check it off and charge me, but they make that stuff
   impossible to replace. I go to the store and ask, 'Do you have coke in a
   glass harmonica? Do you have individually wrapped cashews?'","I went to a doctor, and all he did is suck blood from my neck. Don't go
   see Dr. Acula.","I'm against picketing, but I don't know how to show it.","I wanna hang a map of the world at my house. Then I wanna stick pins in
   the locations that I've traveled to. But first I have to travel to the top
   two corners of the map so it won't fall down.","It's hard to dance if you just your lost wallet. 'Whoa! Where's my wallet?
   But, hey this song is funky.'","People think I'm into sports because I'm a man. But I'm not into sports. I
   like Gatorade, but that's about as far as it goes. By the way, you don't
   have to be sweaty and play basketball to enjoy Gatorade. You can just be a
   thirsty dude. Gatorade forgets about this demographic!","I like rice. Rice is great when you're hungry and you want 2,000 of
   something.","It's very dangerous to wave to people you don't know because what if they
   don't have a hand? They'll think you're cocky. Look what I have. This
   thing is useful. I'm gonna go pick something up.","You know when a company wants to use letters in their phone number, but
   often they'll use too many letters? 'Call
   1-800-I-Really-Enjoy-Brand-New-Carpeting.' Too many letters, man, must I
   dial them all? 'Hello? Hold on, man, I'm only on 'Enjoy.' How did you know
   I was calling? You're good, I can see why they hired you!'","Yeah, I'm not into sports. If someone told me I had athlete's foot, I'd
   say that's not my foot!","Someone handed me a picture and said, 'This is a picture of me when I was
   younger.' Every picture of you is when you were younger. 'Here's a picture
   of me when I'm older.' How you'd pull that off? What's that camera look
   like?","I would not want to be a mobile home repo man. Those would be hard to
   sneak away - 'Knock knock - Hi, would you go cut your grass and look that
   way for a half an hour?'","I don't want to have my face on the cover of a Wheaties box. I wanna have
   my face on the cover of a Rice Krispies box. 'Snap, Krackle, Mitch and
   Pop'!","If I was a locksmith, I'd be pimping that out man. I'll trade you a free
   key duplication for. That joke made me laugh before I could finish it,
   which is good, because it had no ending.","I saw on HBO they were advertising a boxing match 'It's a fight to the
   finish'. That's a good place to end.","I wrote a letter to my Dad - I wrote, 'I really enjoy being here,' but I
   accidentally wrote rarely instead of really. But I still wanted to use it,
   so I wrote, 'I rarely drive steamboats, Dad - there's a lot of stuff you
   don't know about me. Quit trying to act like I'm a steamboat operator.'
   This letter took a harsh turn right away.","Every McDonald's commercial ends the same way: Prices and participation
   may vary. I wanna open a McDonald's and not participate in anything. I
   wanna be a stubborn McDonald's owner. 'Cheeseburgers?' 'Nope! We got
   spaghetti, and blankets.'
   One time I was forced to go to the doctors because of a sports accident.
   Herpes.","I don't own a cell phone or a pager. I just hang around everyone I know,
   all the time. If someone needs to get a hold of me they just say, 'Mitch,'
   and I say, 'what' and turn my head slightly.","I like to smoke a pipe, because it's the punch line indicator. Whenever I
   take a hit of the pipe, you should be laughing.","Alcoholism is a disease, but it's the only one you can get yelled at for
   having. Goddamn it Otto, you are an alcoholic! Goddamn it Otto, you have
   Lupus! One of those two doesn't sound right.","You know when they show someone washing their hair under a waterfall?
   That's crazy. That would knock you on your butt.","I was at this casino minding my own business, and this guy came up to me
   and said, 'You're gonna have to move, you're blocking a fire exit.' As
   though if there was a fire, I wasn't gonna run. If you're flammable and
   have legs, you are never blocking a fire exit.","There's a guy in the audience with a distinctive laugh. I hope that guy is
   miked. The only problem with having a distinctive laugh is I know exactly
   when that guy isn't laughing. 'Oh, distinctive laugh doesn't think that
   joke was funny!'","I like cinnamon rolls, but I don't always have time to make a pan. That's
   why I wish they would sell cinnamon roll incense. Sometimes I'd rather
   light a stick and have my roommate wake up with false hopes.","I think we should only get 3 honks a month on the car horn. Then, someone
   cuts you off, you press the horn, and nothing happens. You're like, 'Crap!
   I wish I hadn't seen Ricky on the sidewalk!'","People teach their dogs to sit, it's a trick. I've been sitting my whole
   life, and a dog has never looked at me as though he thought I was tricky.","I got a business card because I wanna win some lunches. That's what my
   business card says: Mitch Hedberg, Potential Lunch Winner. Gimme a call,
   maybe we'll have lunch. If I'm lucky!","My friend said to me, 'You know what I like? Mashed potatoes.' I was like,
   'Dude, you have to give me time to guess - if you're going to quiz me you
   have to insert a pause.'","I had a paper route when I was a kid. I was supposed to go to 2,000
   houses. Or two dumpsters.","I used to do drugs. I still do, but I used to, too.","They could take sesame seeds off the market and I wouldn't even care. I
   can't imagine 5 years from now saying, 'Remember sesame seeds? What
   happened? All the buns are blank!'","An escalator can never break. It can only become stairs. You would never
   see an 'Escalator Temporarily Out Of Order' sign, just 'Escalator
   Temporarily Stairs. Sorry for the convenience.'","How does a sesame seed stick to a bun? That's magical. There must be some
   sesame seed glue out there. Either that or they're adhesive on one side.
   Peel off the backing, place it on the bun.","I used to be a hot-tar roofer. Yeah, I remember that day.","I like the Fed-Ex driver, 'cause he's a drug dealer and he doesn't even
   know it.","A severed foot is the ultimate stocking stuffer.","I remixed a remix, it was back to normal.","I think foosball is a combination of soccer and shish kabobs.","There was a product on late night TV that you could attach to your garden
   hose - 'You can water your hard-to-reach plants with this.' Who would make
   their plants hard to reach? That seems so very mean. I know you need
   water, but I'm going to make you hard to reach. 'Think like a cactus!'","That would be cool if you could eat a good food with a bad food and the
   good food would cover for the bad food when it got to your stomach. Like
   you could eat a carrot with an onion ring and they would travel down to
   your stomach, then they would get there, and the carrot would say, 'It's
   cool, he's with me.'","If you had a friend who was a tightrope walker, and you were walking down
   a sidewalk, and he fell, that would be completely unacceptable.","My fake plants died because I did not pretend to water them.","I know a lot about cars. I can look at a car's headlights and tell you
   exactly which way it's coming.","I think animal crackers make people think that all animals taste the same.","I have a cheese-shredder at home, which is its positive name. They don't
   call it by its negative name, which is sponge-ruiner. Because I wanted to
   clean it, but now I have little bits of sponge that would melt easily over
   tortilla chips.","I walked by a dry cleaner at 3 am, and there was a sign: 'Sorry, we're
   closed' You don't have to be sorry, it's 3 am, and you're a dry cleaner!
   It would be ridiculous for me to expect you to be open! I'm not gonna walk
   in at 10 am and say 'I walked by here at 3 and you were closed - somebody
   owes me an apology!'
   I bought a seven dollar pen because I always lose pens and I got sick of
   not caring.","Look at the limes in this drink, how they float. That's good news. Next
   time I'm on a boat, and it capsizes, I will reach for a lime. I'm saved by
   the buoyancy of citrus.","My sister wanted to be an actress, but she never made it. She does live in
   a trailer. She got half way. She's an actress, she just never gets called
   to the set.","Every book is a children's book if the kid can read.","Every time I go and shave, I assume there is somebody else on the planet
   shaving as well, so I say, 'I'm gonna go shave too.'","I have an oscillating fan at my house. It goes back and forth. It looks
   like the fan is saying 'no.' So I like to ask it questions that a fan
   would say 'no' to! Do you keep my hair in place? Do you keep my documents
   in order? Do you have 3 settings? LIAR! My fan lied to me. Now I will pull
   the pin up. Now you're not saying ANYTHING!","I got an ant farm. Them fellas didn't grow anything. Hey, how about some
   celery? Plus, if I tore your legs off, you would look like snowmen.","I didn't go to college, but if I did, I would have taken all my tests at a
   restaurant. Because the customer is always right.","Last week I helped my friend stay put. It's a lot easier than helping
   someone move. I went over to his house and made sure that he did not start
   to load stuff into a truck.","I don't have a baby, but if I did, I would either buy a baby-name book or
   invite somebody over who had a cast on.","I got my hair highlighted, because I felt some strands were more important
   than others.","I saw a commercial for an above-ground pool, it was 30 seconds long.
   Because that's the maximum amount of time you can picture yourself having
   fun in an above-ground pool. If it was 31 seconds, the actor would say
   'The water is only up to here? What do I do now? Throw the ball back to
   Jimmy? Or put some goggles on and look at his feet?'","Why are there no 'during' pictures?","I like the public hot-tub at the hotels. I like when a guy is already in
   there, I say, 'Hey, do you mind if I join you?' Then I go turn the heat
   up, and I add some carrots and onions.","I have an underwater camera just in case I crash my car into a river, and
   at the last minute I see a photo opportunity of a fish that I have never
   seen.","As an adult, I'm not supposed to go down slides. So if I'm at the top of a
   slide, I have to pretend that I got there accidentally. 'How the hell did
   I get up here? I guess I have to slide down. Whee!' That's what you say
   when you're having fun. You refer to yourself and some other people.","I had a Velcro wallet in a casino. That sound annoyed the hell out of me.
   Whenever I lost money, and I opened the wallet, it was like the sound of
   my addiction.","I'd like to see a forklift lift a crate of forks. It would be so literal!","If you're a fish, and you want to be a fish stick, you must have very good
   posture.","Sometimes I fall asleep at night with my clothes on. I'm going to have all
   my clothes made out of blankets.","I don't know how to fix a car. If the car breaks down, and the gas tank
   does not say 'E', I'm screwed. But if the gas tank says 'E', I get all
   cocky - 'I've got this one, don't worry.' So I get out the toolbox AKA
   wallet.","I type a 101 words a minute. But it's in my own language.","My apartment is infested with koala bears. It's the cutest infestation
   ever. Way better than cockroaches. When I turn on the light, a bunch of
   koala bears scatter, and I don't want them to! 'Hey - hold on fellas! Let
   me hold one of you, and feed you a leaf.' Koala bears are so cute, why do
   they have to be so far away from me? We need to ship a few over, so I can
   hold one, and pat it on its head.","I had a job interview with an insurance company, and the lady said, 'Where
   do you see yourself in five years?' I said, 'Celebrating the fifth year
   anniversary of you asking me that question.'","I wish I could play little league now. I'd be way better than before.","Every time I walk by a spy shop, I think that I need to put some
   surveillance on somebody. Rick's been acting fishy! I need to buy a safe
   that looks like a Spray 'N Wash can. 'Hey, Mitch, can I use the Spray 'N
   Wash?' 'Yeah, if you want to spray your shirt with documents!'","I never joined the army because at ease was never that easy to me. Seemed
   rather uptight still. I don't relax by parting my legs slightly and
   putting my hands behind my back. That does not equal ease. At ease was not
   being in the military. I am at ease, bro, because I am not in the
   military.","I've never stayed at a bed and breakfast. If I did, I figure you would
   start to get hungry! 'Is that all you got around here? Well, maybe you can
   direct me to a chair lunch dinner.'
   I had a bag of Fritos, they were Texas grilled Fritos. These Fritos had
   grill marks on them. They remind me of summer, when we used to fire up the
   barbeque and throw down some Fritos. I can still see my dad with the apron
   on. Better flip that Frito, dad, you know how I like it.","We're gonna have to sweeten some of these jokes for the CD. You know what
   sweeten means, right? Sweeten is a show-biz term for 'add sugar to'.","I opened-up a yogurt, underneath the lid it said, 'Please try again.'
   because they were having a contest that I was unaware of. I thought maybe
   I opened the yogurt wrong. Or maybe Yoplait was trying to inspire me.
   'Come on Mitchell, don't give up!' An inspirational message from your
   friends at Yoplait. Fruit on the bottom, hope on top.","I was in downtown Boise Idaho and I saw a duck. I knew the duck was lost,
   because ducks aren't supposed to be downtown. There's nothing for 'em
   there. So I went to a Subway sandwich shop. I said, 'Let me have a bun.'
   She wouldn't sell me just the bun, she said it had to have something on
   it. She said it's against Subway regulations to sell just the bun. I guess
   the two halves aren't supposed to touch. So, I said, 'All right, put some
   lettuce on it.' 'That'll be $1.75!' I said, 'It's for a duck!' 'Oh, then
   it's free.' I did not know that. Ducks eat for free at Subway! Had I known
   that, I would have ordered a much larger sandwich. 'Let me have the steak
   fajita sub, and don't bother ringing it up - it's for a duck! There are
   six ducks out there, and they all want Sun Chips!'","I hate flossing, I wish I just had one long curvy tooth. They didn't have
   to make separations for me.","I find that a duck's opinion of me is influenced by whether or not I have
   bread. A duck loves bread, but he does not have the capability to buy a
   loaf. That's the biggest joke on the duck ever. If I worked at a
   convenience store, and a duck came in and stole a loaf of bread, I would
   let him go. I'd say, 'Come back tomorrow, bring your friends!' When I
   think of a duck's friends, I think of other ducks. But he could have, say,
   a beaver in tow.","The next time I move I hope I get a real easy phone number, something like
   2222222. People will ask, 'Mitch, how do I get a hold of you?' I'll say,
   'Just press two for a while, when I answer, you'll know that you've
   pressed two enough.'","If you're an animal, you want to have a beaver as a friend, because they
   have some kick-ass houses. Lake side, my butt! Lake ON!","A waffle is like a pancake with a syrup trap.","I got a smoke alarm at home, but really it's more like a
   9-volt-battery-slowly-drainer.","You know they call corn-on-the-cob, 'corn-on-the-cob', but that's how it
   comes out of the ground. They should just call it corn, and every other
   type of corn, corn-off-the-cob. It's not like if someone cut off my arm
   they would call it 'Mitch', but then re-attached it, and call it
   'Mitch-all-together'.","I have no problem not listening to the Temptations.","I like buying snacks from a vending machine because food is better when it
   falls. Sometimes at the grocery, I'll drop a candy bar so that it will
   achieve its maximum flavor potential.","When you put Listerine in your mouth, it hurts. Germs do not go quietly.","If you're watching a parade, don't follow it. It never changes. If the
   parade is boring, run in the opposite direction. You will fast-forward the
   parade.","On a traffic light yellow means yield, and green means go. On a banana,
   it's just the opposite, yellow means go ahead, green means stop, and red
   means, where'd you get that banana?","Xylophone is spelled with an X. That's wrong. It should be a Z up front.
   Next time you spell xylophone, use a Z. If someone says, 'That's wrong!',
   you say, 'No, it ain't.' If you think that's wrong, then you need to have
   your head Z-rayed."]

bot.on('botRegistered', function() {
  console.log("online");
});

bot.on('botMessage', function(bot, message) {
  console.log('incoming');
  var tokens = tokenizer.tokenize(message.text);

  tokens = _.map(tokens, function(t) { return t.toLowerCase(); });

  if ((tokens.indexOf('groupie') == 0) || (tokens.indexOf('g') == 0)) {
    if ((tokens.indexOf('gif') == 1) && (tokens.indexOf('me') == 2)) {
      tokens = _.without(tokens, 'groupie', 'g', 'gif', 'me');
      console.log("searching for " + tokens);
      giphy.search(escape(tokens.join('+')), 20, 0, function(err, data) {
        if (err) console.error(err);
        console.log("giphy returned " + util.inspect(data));
        if (data.data.length) {
          data = _.shuffle(data.data);
          var id = data[0].id;
          var imageUrl = "http://media3.giphy.com/media/" + id + "/giphy.gif";
          console.log("sending a message " + imageUrl);
          bot.message(imageUrl);
        } else {
          bot.message("Sorry couldn't find anything!")
        }
      });
    } else if ((tokens.indexOf('what') == 1) && (tokens.indexOf('is') == 2)) {
      tokens = _.without(tokens, 'groupie', 'g', 'what', 'is');
      searchTerm = escape(tokens.join('+'))
      request('http://api.urbandictionary.com/v0/define?term=' + searchTerm, function(error, response, body){
        resultJSON = JSON.parse(body)
        if(resultJSON["result_type"] == "no_results") {
          bot.message("I don't know what that is.");
        } else {
          firstDefinition = resultJSON["list"][0]["definition"]
          bot.message(firstDefinition);
        }
      })
    } else if ((tokens.indexOf('image') == 1) && (tokens.indexOf('me') == 2)) {
        tokens = _.without(tokens, 'groupie', 'g', 'image', 'me');
        searchTerm = escape(tokens.join('+'))
        image.search(searchTerm,function(err,images){
          bot.message(images[0].url);
        })
    } else if ((tokens.indexOf('spotify') == 1) && (tokens.indexOf('me') == 2)) {
        tokens = _.without(tokens, 'groupie', 'g', 'spotify', 'me');
        searchTerm = escape(tokens.join('+'));
        var results, linkEnd;
        request('http://ws.spotify.com/search/1/track.json?q=' + searchTerm, function(err, resp, body){
          results = eval("(" + body + ')');
          linkEnd = results["tracks"][0].href.replace('spotify:track:','');
          bot.message("http://open.spotify.com/track/" + linkEnd);
        })
    } else if ((tokens.indexOf('lunch') == 1) && (tokens.indexOf('me') == 2)) {
        var preText = ['Get yourself some', 'Try some', 'Why not some', 'How about', 'Try']
        var lunchOptions = ['salad', 'pizza', 'sushi', 'liquid lunch', 'cheesesteaks', 'food cart', 'halal', 'korean', 'mexican', 'chinese', 'vietnamese']
        bot.message(preText[Math.floor(Math.random() * preText.length)] + " " + lunchOptions[Math.floor(Math.random() * lunchOptions.length)] + "!");
    } else if ((tokens.indexOf('tell') == 1) && (tokens.indexOf('me') == 2) && (tokens.indexOf('a') == 3) && (tokens.indexOf('joke') == 4)) {
        bot.message(hedberg[Math.floor(Math.random() * hedberg.length)])
    } else {
      bot.message("What?")
    }
  }
});

bot.serve(process.env['PORT'] || 3000);
