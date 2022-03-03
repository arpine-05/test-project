const MessageComponent = (props)=>{
    const {message} = props
    return(
        <div className='message'>
            <div className='close-button'>
                <span className="close">&times;</span>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default MessageComponent;
