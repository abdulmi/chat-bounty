## chat-bounty 
Its just a stackoverflow with a bounty. We wanted to give more incentives for people to answer questions, plus more time since
both the person who asked the question and the person answering will get into a chat. This is still in development phase.

## How it started 
The project started in Ethereum hackathon in Waterloo, but our team couldn't finish it in time, so I decided to start it all over on my own.

## How its built 
I am using React for my frontend. I've built one simple contract that handles milestone payments(bounty). Right now, there is no
database implemented to store the extra data(i.e. question, users, messages,etc). Also, used socket.io to make the real-time chat.

## Demo(workflow) 
### Submitting a new question
![submit_a_question](https://i.imgur.com/mQsNfmd.gif)

### Answering a question after clicking answer
![answer](https://i.imgur.com/NxdsVps.gif)

### Paying a milestone
![pay](https://i.imgur.com/QFVx6m3.gif)

## Todo:
- Add a database to store the data
- Polish the frontend
- This could be extended to getting feedback on your resume, getting advice from experienced people in general. 
