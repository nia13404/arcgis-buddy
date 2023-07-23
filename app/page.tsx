import SideBar from './components/SideBar';
import ChatArea from './components/ChatArea';
import Header from './components/Header';

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Header />
        <div className="main">
          <SideBar />
          <ChatArea />
        </div>
      </div>
  )
}
