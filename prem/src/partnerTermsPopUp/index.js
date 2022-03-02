import React from 'react'

const PopUp = props => {
    return (

        <div className="popUp">
            <div className="popUp-content">
                <div className="popUp-header">
                    <h4 className="popUp-title">Terms and Condition</h4>
                </div>
                <div className="popUp-body"> terms and condition content</div>
                <div className="popUp-footer">
                    <button className="button">yes I Accept</button>
                </div>
            </div>
            </div>

    );
};

export default PopUp;