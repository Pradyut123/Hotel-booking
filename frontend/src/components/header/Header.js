import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false); //state for open or close the date picker
  const [openOptions, setOpenOptions] = useState(false); //state to open or close the select counter
  
  const { user } = useContext(AuthContext);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    // stores the initial value of the variables
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {     // takes the previus state eg adult 1, children 0... wont change anything
      return {
        ...prev,
        [name]: operation === "incr" ? options[name] + 1 : options[name] - 1, //now it will find the name eg adult and check if the operation
                                                                            // is inc or dec and perforn accordingly
      };
    });
  };

  const navigate = useNavigate();

  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{ destination, dates, options }})
    navigate("/hotels", { state: { destination, dates, options } });
  };


  return (
    <div className="header">
      <div className={type === "hotelList" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          {/* header icon lists*/}
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          {/* header icon lists 1*/}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          {/* header icon lists 2*/}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          {/* header icon lists 3 */}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          {/* header icon lists 4*/}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {/* header title part*/}
        {type !== "hotelList" && (
          <><h1 className="headerTitle"> A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free Booking website account
        </p>
        {!user && <button className="headerBtn">Sign in / Register</button>}
        {/* header Search part*/}
        <div className="headerSearch">
          {/* header Search Items part1*/}
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          {/* header Search Items part2*/}
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            {/* Date picker open close logic part*/}
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {/* Date picker part*/}
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          {/* header Search Items part3*/}
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span 
            onClick={() => setOpenOptions(!openOptions)} 
            className="headerSearchText">
              {`${options.adult} adult · ${options.children} children · ${options.room} room`}
            </span>
            {/* header Search Items part3 option selection part*/}
            {openOptions && <div className="options">
              {/* header Search Items part3 Adult selection part*/}
              <div className="optionItem">
                <span className="optionText">Adult</span>
                {/* header Search Items part3 adult counter buttons*/}
                <div className="optionCounter">
                <button 
                disabled={options.adult <=1} 
                className="optionCounterButton" 
                onClick={()=>handleOption("adult", "decr")}>-</button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("adult", "incr")}>+</button>
                </div>
              </div>
              {/* header Search Items part3 Children selection part*/}
              <div className="optionItem">
                <span className="optionText">Children</span>
                {/* header Search Items part3 Children counter buttons*/}
                <div className="optionCounter">
                <button 
                disabled={options.children <=0} 
                className="optionCounterButton" 
                onClick={()=>handleOption("children", "decr")}>-</button>
                <span className="optionCounterNumber">{options.children}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("children", "incr")}>+</button>
                </div>
              </div>
              {/* header Search Items part3 Room selection part*/}
              <div className="optionItem">
                <span className="optionText">Room</span>
                {/* header Search Items part3 room counter buttons*/}
                <div className="optionCounter">
                <button 
                disabled={options.room <=1} 
                className="optionCounterButton" 
                onClick={()=>handleOption("room", "decr")}>-</button>
                <span className="optionCounterNumber">{options.room}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("room", "incr")}>+</button>
                </div>
              </div>
            </div>}
          </div>
          {/* header Search Items part3*/}
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Header;
