import { Global } from '@emotion/react';
import { Layout } from './Layout/Layout';
import { Style } from './GlobalStyle';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { useState } from 'react';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const leaveFeedback = key => {
    switch (key) {
      case 'good':
        setGood(pervState => pervState + 1);
        break;
      case 'neutral':
        setNeutral(pervState => pervState + 1);
        break;
      case 'bad':
        setBad(pervState => pervState + 1);
        break;
      default:
        break;
    }
  };
  const countTotalFeedback = () => good + neutral + bad;
  const countPositiveFeedbackPercentage = () =>
    Math.round((good / countTotalFeedback()) * 100) || 0;
  return (
    <Layout>
      <FeedbackOptions
        options={Object.keys({ good, neutral, bad })}
        onLeaveFeedback={leaveFeedback}
      ></FeedbackOptions>
      {!countTotalFeedback() ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      )}
      <Global styles={Style} />
    </Layout>
  );
};
