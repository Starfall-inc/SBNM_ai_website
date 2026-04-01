const { ChatGroq } = require("@langchain/groq");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

let model;
if (process.env.GROQ_API_KEY) {
  model = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    apiKey: process.env.GROQ_API_KEY,
  });
}

const SYSTEM_PROMPT = `You are SBNM AI, the official digital assistant for Shri Bhairavnath Nisarg Mandals Polytechnic Institute (SBNM Polytechnic), located at Gevrai Tanda, Paithan Road, Aurangabad, Maharashtra, India.

## College Identity
- Full name: Shri Bhairavnath Nisarg Mandals Diploma in Engineering & Technology (Polytechnic) Institute
- Short name: SBNM Polytechnic
- Website: www.sbnmpoly.org
- Location: Gevrai Tanda, Paithan Road, Aurangabad, Maharashtra
- Affiliation: MSBTE (Maharashtra State Board of Technical Education)
- Approval: DTE Maharashtra (Directorate of Technical Education)

## Programmes Offered (3-Year Diploma)
1. Computer Science Engineering (CO) – 60 Seats
2. Mechanical Engineering (ME) – 60 Seats
3. Civil Engineering (CE) – 60 Seats
4. Electrical Engineering (EE) – 60 Seats
5. Food Technology (FT) – 60 Seats

## Fees
- Annual tuition: approx ₹25,000 per year (confirm with office)
- Scholarships: Maharashtra Govt, EBC, OBC, SC/ST scholarship schemes available

## Admissions
- Process: Online via DTE Maharashtra Polytechnic Admission portal (MSBTE CAP rounds)
- Eligibility: SSC (10th) passed with Maths & Science, min 35% aggregate
- Age: up to 23 years (relaxation for reserved categories)
- Documents needed: SSC marksheet, school leaving certificate, domicile, caste certificate (if applicable), Aadhar card, photographs

## Facilities
- Well-equipped Computer, Mechanical, Civil, Electrical labs
- Food Technology lab for practical food science training
- Research Centre for applied studies across departments
- Library: rich collection of textbooks, reference books, journals
- Sports facilities on campus

## Contact
- Phone: +91 240 230 3030
- Email: info@sbnmpoly.org
- Address: Gevrai Tanda, Paithan Road, Aurangabad, Maharashtra
- Office hours: Monday–Saturday, 9:00 AM – 5:00 PM

## Placement
- Active placement cell
- Industry connections with manufacturing, IT, food processing companies
- Career guidance and soft-skills training provided

## Your Behaviour
- Be warm, professional, and helpful in simple English/Hinglish
- Always answer about SBNM Polytechnic specifically
- For anything not in your knowledge, direct to +91 240 230 3030 or info@sbnmpoly.org
- Keep responses concise and structured; use bullet points for lists
- Mention relevant website sections (/admissions, /courses, /contact) when helpful`;

exports.getChatResponse = async (userMessage) => {
  if (!model) return offlineResponse(userMessage);
  try {
    const res = await model.invoke([new SystemMessage(SYSTEM_PROMPT), new HumanMessage(userMessage)]);
    return res.content;
  } catch (err) {
    console.error("SBNM AI error:", err);
    throw err;
  }
};

function offlineResponse(msg) {
  const m = msg.toLowerCase();

  if (/admission|apply|join|enroll/.test(m))
    return `📋 **Admissions at SBNM Polytechnic**\n\n**Process:**\n- Register on DTE Maharashtra Polytechnic Admission portal\n- Fill application form & upload documents\n- Participate in CAP rounds (merit-based)\n\n**Eligibility:** SSC (10th) passed, min 35%, Maths & Science compulsory\n\n**Documents needed:** SSC marksheet, school leaving certificate, domicile, caste certificate, Aadhar, 4 photos\n\nVisit /admissions or call 📞 +91 240 230 3030`;

  if (/course|branch|programme|diploma/.test(m))
    return `📚 **SBNM Polytechnic – Diploma Programmes (3 Years)**\n\n1. Computer Science Engineering (CO) — 60 Seats\n2. Mechanical Engineering (ME) — 60 Seats\n3. Civil Engineering (CE) — 60 Seats\n4. Electrical Engineering (EE) — 60 Seats\n5. Food Technology (FT) — 60 Seats\n\nAll affiliated to **MSBTE**. Visit /courses for details.`;

  if (/fee|cost|scholarship|rupee/.test(m))
    return `💰 **Fee Structure**\n\n- Annual fees: approx ₹25,000/year\n- Application fee: ₹300 (DTE portal)\n\n🎓 **Scholarships available:**\n- Maharashtra Government Scholarship\n- EBC Scholarship\n- OBC / SC / ST Schemes\n\nContact admissions for exact figures: +91 240 230 3030`;

  if (/placement|job|career/.test(m))
    return `💼 **Placement at SBNM**\n\n- Active Placement Cell on campus\n- Industry tie-ups with manufacturing, IT, food processing firms\n- Career guidance & soft-skills training\n\nFor placement enquiries: info@sbnmpoly.org`;

  if (/facilit|lab|library|research/.test(m))
    return `🏫 **Campus Facilities**\n\n- Computer & Electronics Labs\n- Mechanical & Civil Workshops\n- Food Technology Lab\n- **Research Centre** for applied studies\n- **Library** — textbooks, journals, reference books\n- Sports facilities\n- High-speed internet`;

  if (/contact|phone|address|location|where/.test(m))
    return `📍 **SBNM Polytechnic**\nGevrai Tanda, Paithan Road, Aurangabad, Maharashtra\n\n📞 +91 240 230 3030\n📧 info@sbnmpoly.org\n🌐 www.sbnmpoly.org\n\n⏰ Mon–Sat: 9 AM – 5 PM\n\nVisit /contact for a map.`;

  if (/eligib|qualif|10th|ssc|merit/.test(m))
    return `✅ **Eligibility for SBNM Polytechnic**\n\n- SSC (10th) passed from Maharashtra Board or equivalent\n- **Minimum 35% aggregate**\n- Must have studied **Maths & Science**\n- Age: up to **23 years** (relaxation for SC/ST)\n\nAdmission is merit-based via DTE Maharashtra CAP rounds.`;

  return `🙏 Hi! I'm **SBNM AI**, your guide for **Shri Bhairavnath Nisarg Mandals Polytechnic, Aurangabad**.\n\n*(Running in offline mode — AI key not configured)*\n\nI can still answer about:\n- 📋 Admissions & eligibility\n- 📚 Courses (CO, ME, CE, EE, FT)\n- 💰 Fees & scholarships\n- 🏫 Facilities & campus\n- 💼 Placement\n- 📍 Location & contact\n\nOr call us directly: **+91 240 230 3030**`;
}