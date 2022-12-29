import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../components/hooks/useAxiosPrivate";
import Spinner from "../../../components/Spinner";
import ThreadContent from "./ThreadContent";

const Thread = ({ topicId }) => {
  const [topic, setTopic] = useState([]);
  const [reload, setReload] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
   console.log(reload)
  }, [reload]);

  useEffect(() => {
    async function fetchDiscussions() {
      const res = await axiosPrivate.get(`discussions/${topicId}`);

      setTopic(() => res.data);
      console.log(res.data)
      setLoading(false)
    }

    fetchDiscussions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, reload]);

  return <>{isLoading ? <Spinner></Spinner> : <ThreadContent reload={reload} setReload={setReload} topic={topic} topicId={topicId} />}</>;
};

export default Thread;
