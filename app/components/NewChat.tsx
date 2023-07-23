'use client';
import PlusIcon from 'calcite-ui-icons-react/PlusIcon';
import {chatHistory} from './../data'

function NewChat (){

    const createNewChat = async() => {
        chatHistory.push({
            "title": "New Chat",
            "messages": []
        })

        console.log("createNewChat");
    };
    
    return(
        <button onClick={createNewChat} className="newChat" >
            <PlusIcon />
            New Chat
        </button>
    );
}

export default NewChat;