import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./HotelList.css";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="hotelList" />
      <div className="hotelListContainer">
        <div className="hotelListWrapper">
          <div className="hotelListSearch">
            <h1 className="hotelListSearchTitle">Search</h1>
            {/* Hotel search List Item 1*/}
            <div className="hotelListSearchItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            {/* Hotel search List Item 2*/}
            <div className="hotelListSearchItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            {/* Hotel search List Item 3*/}
            <div className="hotelListSearchItem">
              <label>Options</label>
              <div className="listSearchOptions">
                {/* Hotel search List options Item 1*/}
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">
                    Min Price<small style={{fontSize:9, marginLeft:5}}>(Per Night)</small>
                  </span>
                  <input type="number" onChange={(e) => setMin(e.target.value)} className="ListSearchOptionInput" />
                </div>
                {/* Hotel search List options Item 2*/}
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">
                    Max Price<small style={{fontSize:9, marginLeft:5}}>(Per Night)</small>
                  </span>
                  <input type="number" onChange={(e) => setMax(e.target.value)} className="ListSearchOptionInput" />
                </div>
                {/* Hotel search List options Item 3*/}
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">Adult</span>
                  <input
                    type="number"
                    className="ListSearchOptionInput"
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                {/* Hotel search List options Item 4*/}
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">Children</span>
                  <input
                    type="number"
                    className="ListSearchOptionInput"
                    placeholder={options.children}
                    min={0}
                  />
                </div>
                {/* Hotel search List options Item 5*/}
                <div className="listSearchOptionItem">
                  <span className="listSearchOptionText">Room</span>
                  <input
                    type="number"
                    className="ListSearchOptionInput"
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="hotelListResult">
          {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
