import { useState } from "react";
import axios from "axios";


function Audience() {
  const [conditions, setConditions] = useState([]);
  const [segmentName, setSegmentName] = useState("");
  const [audienceSize, setAudienceSize] = useState(null);
  const [audience, setAudience] = useState(null);

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", logic: "AND" },
    ]);
  };

  const handleConditionChange = (index, key, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][key] = value;
    setConditions(updatedConditions);
  };

  const handleCreateSegment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/audience`,
        {
          name: segmentName,
          conditions,
        }
      );
      setAudience(response.data); 
      setAudienceSize(response.data.size);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div >
      <h1>Create Audience Segment</h1>
      <input
        type="text"
        placeholder="Segment Name"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
        
      />
      {conditions.map((condition, index) => (
        <div key={index} >
          <select
            value={condition.field}
            onChange={(e) =>
              handleConditionChange(index, "field", e.target.value)
            }
          >
            <option value="">Select Field</option>
            <option value="spending">Total Spending</option>
            <option value="visits">Visits</option>
            <option value="lastVisit">Last Visit</option>
          </select>
          <select
            value={condition.operator}
            onChange={(e) =>
              handleConditionChange(index, "operator", e.target.value)
            }
          >
            <option value="">Select Operator</option>
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value=">=">Greater or Equal</option>
            <option value="<=">Less or Equal</option>
            <option value="=">Equal</option>
          </select>
          <input
            type="text"
            value={condition.value}
            placeholder="Value"
            onChange={(e) =>
              handleConditionChange(index, "value", e.target.value)
            }
            
          />
          {index > 0 && (
            <select
              value={condition.logic}
              onChange={(e) =>
                handleConditionChange(index, "logic", e.target.value)
              }
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}
        </div>
      ))}
      <button onClick={handleAddCondition}>Add Condition</button>
      <button onClick={handleCreateSegment}>Create Segment</button>
      {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
      {audience && (
        <button
          onClick={async () => {
            
              await axios
                .post(
                  `${process.env.REACT_APP_API_URL}/campaigns/send-messages`,
                  { audienceId: audience._id }
                )
                .then(() => {
                  alert("Messages sent successfully!");
                })
                .catch((error) => {
                  console.error(
                    "Error sending messages:",
                    error.response?.data || error
                  );
                  alert("Failed to send messages.");
                });

              // alert("Messages sent successfully!");
            // } catch (error) {
            //   console.error("Error sending messages:", error);
            // }
          }}
        >
          Send Messages
        </button>
      )}
    </div>
  );
}

export default Audience;
