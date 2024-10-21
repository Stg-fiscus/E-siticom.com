import { useClient } from "@backend/client";
import { setFeedback } from "@store/feedback/feedbackSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setNavigationFeedbackSubpage } from "@store/navigation/navigationSlice";
import { IFeedbackAnswer } from "@types";
import { useSimpleMessage } from "@utils/hooks/message";
import { Divider, Image, List } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const FeedbackAnswers = () => {
  const client = useClient();
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state) => state.feedback.feedback);
  // dispatch(setNavigationDashboardSubpage("Санал хүсэлт"));
  const [feedbackAnswers, setFeedbackAnswers] = useState<IFeedbackAnswer[]>([]);
  const [messageApi, contextHolder] = useSimpleMessage();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!feedback) {
        const response = await client.getFeedbackById(parseInt(id!));

        if (response.success) {
          dispatch(setFeedback(response.data!));
        } else {
          messageApi.error(response.message);
        }
      }

      if (feedback) {
        dispatch(setNavigationFeedbackSubpage(feedback?.title!));
      }
    })();

    (async () => {
      const response = await client.getFeedbackAnswers(parseInt(id!));

      if (response.success) {
        setFeedbackAnswers(response.data!);
      } else {
        messageApi.error(response.message);
      }
    })();
  }, []);

  return (
    <>
      {contextHolder}
      {feedback && (
        <div className="mb-5">
          <p>{feedback!.content}</p>
          {feedback!.image && <Image src={feedback!.image} height={100} />}
        </div>
      )}

      <Divider orientation="left">
        <h2 className="text-2xl">Хариултууд</h2>
      </Divider>
      <List
        dataSource={feedbackAnswers}
        renderItem={(item) => (
          <List.Item className="flex flex-col !items-start justify-start">
            <h3 className="text-xl">{item.author}</h3>
            <p>{item.content}</p>
            <p className="text-sm text-secondary-txt">
              {item.updatedAt} дамжуулсан
            </p>
          </List.Item>
        )}
      />
    </>
  );
};
