import { useState } from 'react';
import { 
  FileText, 
  Send, 
  Bot, 
  User, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Book,
  MessageCircle,
  Loader
} from 'lucide-react';

const AssignmentFeedback = () => {
  const [submission, setSubmission] = useState('');
  const [teacherRemarks, setTeacherRemarks] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('teacher'); // 'teacher' or 'student'

  const handleAnalyze = async () => {
    if (!submission.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Mock API call to AI service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFeedback({
        teacherFeedback: {
          summary: "The student demonstrated basic understanding but lacks depth.",
          suggestedGrade: "B-",
          keyAreas: [
            "Content needs more detailed examples",
            "Structure could be improved",
            "Good grammar but some minor errors"
          ],
          strengths: [
            "Basic concepts are correct",
            "Clear writing style"
          ],
          improvements: [
            "Add more specific examples",
            "Expand on key concepts",
            "Proofread for minor errors"
          ]
        },
        studentFeedback: {
          positivePoints: [
            "You've shown good understanding of basic concepts",
            "Your writing is clear and easy to follow"
          ],
          improvementAreas: [
            "Consider adding more specific examples",
            "Try to expand your explanations",
            "Double-check for small grammar errors"
          ],
          tips: [
            "Use concrete examples to illustrate your points",
            "Research additional sources for deeper insights",
            "Review your work before submission"
          ]
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Bot className="text-blue-400 mr-3" />
            AI Assignment Feedback
          </h1>

          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-blue-400 mb-2">Student Submission</label>
              <textarea
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                className="w-full h-48 bg-blue-900/20 rounded-lg p-4 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste student's submission here..."
              />
            </div>
            <div>
              <label className="block text-blue-400 mb-2">Teacher's Remarks (Optional)</label>
              <textarea
                value={teacherRemarks}
                onChange={(e) => setTeacherRemarks(e.target.value)}
                className="w-full h-48 bg-blue-900/20 rounded-lg p-4 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add your remarks here..."
              />
            </div>
          </div>

          {/* Analyze Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !submission.trim()}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="mr-2" />
                  Analyze Submission
                </>
              )}
            </button>
          </div>

          {/* Feedback Tabs */}
          {feedback && (
            <div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('teacher')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'teacher'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-900/20 text-blue-400'
                  }`}
                >
                  <Book className="mr-2" />
                  Teacher View
                </button>
                <button
                  onClick={() => setActiveTab('student')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-900/20 text-blue-400'
                  }`}
                >
                  <User className="mr-2" />
                  Student View
                </button>
              </div>

              {/* Teacher Feedback */}
              {activeTab === 'teacher' && (
                <div className="space-y-6">
                  <FeedbackSection
                    title="Summary"
                    icon={FileText}
                    content={feedback.teacherFeedback.summary}
                  />
                  <FeedbackSection
                    title="Suggested Grade"
                    icon={Award}
                    content={feedback.teacherFeedback.suggestedGrade}
                  />
                  <FeedbackSection
                    title="Key Areas"
                    icon={AlertCircle}
                    content={feedback.teacherFeedback.keyAreas}
                  />
                  <FeedbackSection
                    title="Strengths"
                    icon={CheckCircle}
                    content={feedback.teacherFeedback.strengths}
                  />
                  <FeedbackSection
                    title="Suggested Improvements"
                    icon={MessageCircle}
                    content={feedback.teacherFeedback.improvements}
                  />
                </div>
              )}

              {/* Student Feedback */}
              {activeTab === 'student' && (
                <div className="space-y-6">
                  {teacherRemarks && (
                    <FeedbackSection
                      title="Teacher's Remarks"
                      icon={MessageCircle}
                      content={teacherRemarks}
                    />
                  )}
                  <FeedbackSection
                    title="What You Did Well"
                    icon={CheckCircle}
                    content={feedback.studentFeedback.positivePoints}
                  />
                  <FeedbackSection
                    title="Areas for Improvement"
                    icon={AlertCircle}
                    content={feedback.studentFeedback.improvementAreas}
                  />
                  <FeedbackSection
                    title="Tips for Next Time"
                    icon={Book}
                    content={feedback.studentFeedback.tips}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FeedbackSection = ({ title, icon: Icon, content }) => (
  <div className="bg-blue-900/20 rounded-lg p-6">
    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
      <Icon className="text-blue-400 mr-2" />
      {title}
    </h3>
    {Array.isArray(content) ? (
      <ul className="space-y-2">
        {content.map((item, index) => (
          <li key={index} className="text-blue-400 flex items-start">
            <span className="mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-blue-400">{content}</p>
    )}
  </div>
);

export default AssignmentFeedback;