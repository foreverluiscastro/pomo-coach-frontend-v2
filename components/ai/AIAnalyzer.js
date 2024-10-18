import { useState } from "react";
import { Container } from "../core/Container";

export default function AIAnalyzer({ isStudy }) {
  const [analysis, setAnalysis] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to send input data to ChatGPT and receive response
  function analyzeHabitsAndProvideAdvice() {
    // console.log("Analyze habits was called");
    setIsLoading(true);

    const today = new Date().toISOString();

    fetch(`/ai-analyzer?time_range=this_week&date=${encodeURIComponent(today)}`)
      .then((r) => r.json())
      .then((analysis) => {
        setAnalysis(analysis.data);
        setIsGenerated(true);
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <div className="text-left px-4 flex justify-between mb-4">
        <h1 className="font-semibold text-lg items-center">AI Analyzer</h1>
      </div>
      <div className="flex flex-col items-center">
        {!isGenerated ? (
          <>
            <p className="w-2/3 mb-4">
              Utilize AI to assess your study habits and receive personalized
              advice for enhancing or optimizing your routine.
            </p>
            <button
              className={`EditButton ${
                isStudy ? "StudyButtonSecondary" : "BreakButtonSecondary"
              }`}
              onClick={analyzeHabitsAndProvideAdvice}
            >
              {!isLoading ? "Analyze Habits" : "Loading..."}
            </button>
          </>
        ) : (
          <>
            {analysis && (
              <>
                <ul className="w-2/3">
                  {analysis.map((s, idx) => (
                    <li
                      key={idx}
                      className={`${
                        isStudy ? "StudySecondary" : "BreakSecondary"
                      } py-2 px-4 my-2 rounded-lg shadow-md`}
                    >
                      {s}.
                    </li>
                  ))}
                </ul>
                <div className="flex items-center">
                  <p>Not Satisfied? </p>
                  <button
                    className={`EditButton ${
                      isStudy ? "StudyButtonSecondary" : "BreakButtonSecondary"
                    }`}
                    onClick={analyzeHabitsAndProvideAdvice}
                  >
                    {!isLoading ? "Analyze Again!" : "Loading..."}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
