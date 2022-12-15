import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "moment";

const ViewStats = (props) => {
  const [recentpub, setRecentPub] = useState(0);
  const [recentupdate, setRecentUpdate] = useState(0);
  const [mostpub, setMostPub] = useState("");
  const [mostpubcount, setMostPubCount] = useState(0);
  const [mostauth, setMostAuth] = useState("");
  const [mostauthcount, setMostAuthCount] = useState(0);
  const [oldestpub, setOldestPub] = useState("");
  const [oldestpubdate, setOldestPubDate] = useState("");
  const [latestpub, setLatestPub] = useState("");
  const [latestpubdate, setLatestPubDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/books/stats")
      .then((res) => {
        console.log(res.data);
        setRecentPub(res.data["query_results"][0]["recently_published"]);
        setRecentUpdate(res.data["query_results"][1]["recently_updated"]);
        setMostPub(res.data["query_results"][2]["_id"]);
        setMostPubCount(res.data["query_results"][2]["count"]);
        setMostAuth(res.data["query_results"][3]["_id"]);
        setMostAuthCount(res.data["query_results"][3]["count"]);
        setOldestPub(res.data["query_results"][4]["title"]);
        let x = res.data["query_results"][4]["published_date"];
        console.log(x);
        let y = res.data["query_results"][5]["published_date"];
        setOldestPubDate(Moment(x).format("DD-MM-YYYY"));
        setLatestPub(res.data["query_results"][5]["title"]);
        setLatestPubDate(Moment(y).format("DD-MM-YYYY"));
      })
      .catch((err) => {
        console.log("Error from View Stats");
      });
  }, []);
  return (
    <div className="ViewStats">
      <Link to="/" className="btn btn-outline-warning float-left col-md-12">
        Back to Home
      </Link>
      <br />
      <br />
      <div className="col-md-12">
        <br />
        <h2 className="display-4 text-center">Book Stats</h2>
        <br />
      </div>
      <div className="col-md-12">
        <table className="table table-hover table-dark table-bordered">
          <tbody>
            <tr>
              <th scope="row" className="text-center">
                1
              </th>
              <td>Recently Updated (1 week)</td>
              <td className="text-center">{recentupdate}</td>
              <td className="text-center">-</td>
            </tr>
            <tr>
              <th scope="row" className="text-center">
                2
              </th>
              <td>Recently Published (1 week)</td>
              <td className="text-center">{recentpub}</td>
              <td className="text-center">-</td>
            </tr>
            <tr>
              <th scope="row" className="text-center">
                3
              </th>
              <td>Most Books by an author</td>
              <td className="text-center">{mostauthcount}</td>
              <td className="text-center">{mostauth}</td>
            </tr>
            <tr>
              <th scope="row" className="text-center">
                4
              </th>
              <td>Most Books by a publisher</td>
              <td className="text-center">{mostpubcount}</td>
              <td className="text-center">{mostpub}</td>
            </tr>
            <tr>
              <th scope="row" className="text-center">
                5
              </th>
              <td>First Published</td>
              <td className="text-center">{oldestpubdate}</td>
              <td className="text-center">{oldestpub}</td>
            </tr>
            <tr>
              <th scope="row" className="text-center">
                6
              </th>
              <td>Last Published</td>
              <td className="text-center">{latestpubdate}</td>
              <td className="text-center">{latestpub}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStats;
