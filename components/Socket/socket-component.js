import socketIO from 'socket.io-client';

// socket
export default class Socket{
    
    static handle = null;

    // 서버와 연걸하기
    static connect = async (token) => {
        this.handle = socketIO.connect(`https://almosdare.herokuapp.com?auth=${await token}`);
    }

    // instant,dare의 idx로 join, leave;
    static joinRoomToSendByArray = (idxs) => idxs.map(idx => this.handle.emit("joinRoomToSend", idx));
    static leaveRoomToSendByArray = (idxs) => idxs.map(idx => this.handle.emit("leaveRoomToSend", idx));

    // 위치 보내기
    static sendMemberLocation = (location) => this.handle.emit("sendMemberLocation", location);

    // 하나의 instant를 구독하기
    static subscribeToInstant = (idx, func) => {
        this.handle.emit("joinRoomToRecv", idx);
        this.handle.on("changedOtherMemberLocation", func);
    }
    // 하나의 instant를 구독 취소하기
    static unsubscribeToInstant = (idx) => {
        this.handle.emit("leaveRoomToRecv", idx);
        this.handle.off("changedOtherMemberLocation");
    }

}