/** Phân loại nguy cơ từ chín câu trả lời; giới tính và lối sống không tự nâng mức nguy cơ. */
export function classify(v) {
  const earlyOnset = Number(v.onset) === 3;
  const moderateDegree = Number(v.degree) === 1;
  const highDegree = Number(v.degree) === 2;
  const moderateProgression = Number(v.progression) === 2;
  const rapidProgression = Number(v.progression) === 3;
  const familyRisk = Number(v.parents) > 0;
  const twoParentsMyopic = Number(v.parents) === 2;
  const lifestylePair = Number(v.outdoor) > 0 && Number(v.near) > 0;
  const youngerCurrentAge = Number(v.age) === 2;

  const high = rapidProgression || highDegree || (earlyOnset && (moderateDegree || moderateProgression));
  const medium = !high && (moderateProgression || earlyOnset || (moderateDegree && (youngerCurrentAge || familyRisk || lifestylePair)) || (twoParentsMyopic && (Number(v.outdoor) > 0 || Number(v.near) > 0)));
  return high ? "high" : medium ? "medium" : "low";
}
