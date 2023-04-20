import callApi from "@/http/call-api";

// 获取所有题目类型
export const getAllQuestionsType = (params: { uid: number }) => callApi<{ content: string[]; }>({
  url: '/api/questions/type/all',
  method: 'get',
  params,
})

// 获取某个类型的题目
export const getQuestionsByType = (params: { type?: string; uid?: number; }) => callApi<{ content: Question[]; score: string; }>({
  url: '/api/questions/find',
  method: 'get',
  params,
})

// 提交题目集题目
export const submitSelfTest = (params: CourseParams.SubmitSelfTest) => callApi<{ score: number; content: any[]; }>({
  url: '/api/questions/submitSelfTest',
  method: 'post',
  data: params
})

export const getUserQuestionsListAndScore = (params: { uid?: number }) => callApi<{ content: QuestionsAnalysis[] }>({
  url: '/api/questionsList/score',
  method: 'get',
  params
})