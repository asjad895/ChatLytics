const Message=require('../models/message');
const { groups } = require('./groupsControllers');
const messagesC=async (req, res) => {
    try {
      // Extract data from the request body
      const { sender, receiver, groupName, text } = req.body;
      // Create a new message document
      const message = new Message({
        sender,
        receiver,
        groupName,
        text,
      });
      // Save the message to the database
      await message.save();
      // Send a success response
      res.status(201).json({ message: 'Message stored successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Define an API endpoint to fetch messages for a specific group
const messageg=async (req, res) => {
  try {
    // Extract the group name from the query parameter
    const groupName = req.query.group;
    // Fetch messages for the specified group from the "messages" collection
    const messages = await Message.findOne({ groupName });
    if(!messages){
      res.status(500).json({ error: 'u are new!enjoy' });

    }else{
      // Send the messages as JSON response
      const username=messages.sender;
      const time=messages.createdAt;
      const group=messages.groupName;
      const m=messages.text;
      console.log(username);
      const time1 = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
      const month = time.toLocaleString('default', { month: 'short' });
      const day = time.getDate();
      const formattedDateTime = `${day}|${month}:${time1}`;
      console.log(formattedDateTime); 
      const data={user:username,group:group,time:formattedDateTime,message:m};
      console.log(data);
      res.json(data);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports={messagesC,messageg};