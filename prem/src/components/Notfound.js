import React from "react";

class Notfound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div className="cs-body">
                <div id="cs-not-found">
                    <div className="content">
                        <h2>404 </h2>
                        <h5 className="notfount">opps! Page not found </h5>
                        <p>The page you ware Looking for dosen't exist. You may have mistyped the address
                            or the page may have moved. </p>
                        <a href="/" > Back To Home</a>
                    </div>
                </div>
            </div>

        );
    }
}
export default Notfound;
