"use client"

const Avatar = ({isGpt}) => {
    return(
        <div className="avatarIcon">
            {isGpt ? "AI" : "ME"}
        </div>
    );
}

export default Avatar;