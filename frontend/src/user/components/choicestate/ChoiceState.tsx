import React from "react";



interface ChoiceStateProps {
    state: string,
    interconnectness?: boolean
}

export const ChoiceState = ({state, interconnectness = false}:ChoiceStateProps) => {

        if (!state) {
            if (interconnectness){
                return(
                    <div className="alert alert-warning col-md-6 mt-md-4" role="alert">
                        <h4>  Please select country and interconnectedness</h4>
                    </div>
                )

            }
            return(
            <div className="alert alert-warning col-md-6 mt-md-4" role="alert">
                <h4>  Please select country  </h4>
            </div>
            )
        }


        return (
            <div className="alert alert-success col-md-6 mt-md-4" role="alert">
                <h4>  You can see results for chosen country <b>{state} :</b>  </h4>
            </div>
        );
}

