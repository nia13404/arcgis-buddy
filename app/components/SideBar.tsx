import NewChat from './NewChat';
import SpeechBubbleIcon from 'calcite-ui-icons-react/SpeechBubbleIcon'
import {chatHistory} from './../data'
function SideBar() {
    return(
        <div className="sideBar">
            <NewChat />
            {
                chatHistory.map(function(chat){
                    return(
                        <div className="flex align-center chatRow chatIcon">
                            <SpeechBubbleIcon className="icon"/>
                            {chat.title}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SideBar;