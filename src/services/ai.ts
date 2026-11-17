// Simulated AI layer. Replace the bodies below with real LLM API calls later; signatures can stay the same.
export const delay=(ms=900)=>new Promise(r=>setTimeout(r,ms));
export interface LessonIn{topic:string;level:string;duration:string;style:string;objectives:string;extra:string}
export interface Section{title:string;body:string}
export async function generateLesson(i:LessonIn):Promise<Section[]>{await delay(1100);const t=i.topic;
 return[
 {title:'Learning objectives',body:(i.objectives||`Understand the core idea of ${t}\nApply it to a simple example\nExplain it in your own words`)},
 {title:'Introduction (5 min)',body:`Open with a question: "Where have you already seen ${t} in daily life?" Link answers to today's goal for ${i.level.toLowerCase()} learners.`},
 {title:'Explanation of concepts',body:`1. What ${t} is and why it matters.\n2. The key terms, defined simply.\n3. How the idea works step by step. Style: ${i.style||'practical and interactive'}.`},
 {title:'Real-world examples',body:`Recommendation of videos on a streaming app.\nSpam filtering in email.\nPredicting delivery times.`},
 {title:'Teaching activities',body:`Think-pair-share (5 min). Live demo (10 min). Group discussion on one example.`},
 {title:'Practical exercise',body:`Learners complete a short hands-on task on ${t} using a small provided dataset, then compare results in pairs. Total time: ${i.duration}.${i.extra?'\nTrainer note: '+i.extra:''}`},
 {title:'Key takeaways',body:`${t} is a tool, not magic.\nQuality of data matters.\nAlways check results critically.`},
 {title:'Assessment questions',body:`1. Define ${t} in one sentence.\n2. Give one real-world example.\n3. What could go wrong if the data is poor?`}]}
export interface Q{id:string;type:string;q:string;options?:string[];answer:string;exp:string;diff:string;src:number}
type Item=[string,number,string,string,string[],string,string,string];
const K=(k:string,d:number,q:string,a:string,w:string[],e:string,t:string,f:string):Item=>[k,d,q,a,w,e,t,f];
const bank:Item[]=[
K('ai',0,'Which is an everyday example of AI?','A voice assistant answering questions',['A paper calendar','A basic calculator','A light switch'],'Voice assistants use AI to understand speech and respond.','A voice assistant is an example of AI.','A basic calculator is a typical example of modern AI.'),
K('ai',1,'What does AI aim to do?','Perform tasks that normally need human intelligence',['Replace all software','Store large files','Speed up the internet'],'AI builds systems for tasks like language understanding or image recognition.','AI aims to perform tasks that normally need human intelligence.','AI is only about robots.'),
K('ai',2,'Which is a key risk when AI informs decisions about people?','Biased outputs from biased training data',['Screens becoming too bright','Slower keyboards','Higher paper use'],'Models can reproduce bias in their data, so humans should review high-impact decisions.','Biased training data can lead to biased AI outputs.','AI outputs never need human review.'),
K('ml',0,'Machine learning lets computers…','learn patterns from data',['only follow fixed rules','run without electricity','replace all programmers'],'ML systems improve by finding patterns in examples.','Machine learning learns patterns from data.','Machine learning never uses data.'),
K('ml',1,'Machine learning is best described as a subset of…','Artificial intelligence',['Databases','Networking','Web design'],'ML is one approach to AI, where systems learn from data.','ML is a subset of AI.','AI is a subset of ML.'),
K('ml',2,'Why is a separate test set used?','To measure performance on unseen data',['To make training faster','To add more labels','To reduce file size'],'Testing on unseen data shows whether the model generalises.','A test set measures performance on unseen data.','A test set should be used for training.'),
K('sup',0,'What does supervised learning train on?','Labelled examples',['Unlabelled data only','Random noise','No data'],'Supervised learning learns from examples with known answers (labels).','Supervised learning is trained on labelled data.','Supervised learning needs no labelled data.'),
K('sup',1,'Which is a classification task?','Detecting spam email',['Predicting house price','Grouping similar customers','Compressing images'],'Classification assigns categories such as spam or not spam.','Spam detection is a classification task.','Predicting a house price is a classification task.'),
K('sup',2,'Which supervised task predicts a continuous number?','Regression',['Classification','Clustering','Tokenisation'],'Regression predicts numeric values such as price; classification predicts categories.','Regression predicts continuous values.','Regression predicts categories only.'),
K('nn',0,'Neural networks are made of connected…','neurons (nodes)',['database tables','spreadsheets','folders'],'Neurons take inputs, apply weights and pass outputs on.','Neural networks are made of connected neurons.','Neural networks contain no weights.'),
K('nn',1,'What is adjusted during neural network training?','Weights',['Screen resolution','File names','Batch names'],'Training adjusts weights to reduce error.','Training adjusts a network’s weights.','Weights never change during training.'),
K('nn',2,'What does an activation function add?','Non-linearity, so the network can learn complex patterns',['Storage for training data','Automatic data deletion','Printing of results'],'Without non-linearity, stacked layers behave like one linear layer.','Activation functions add non-linearity.','Activation functions store the training data.'),
K('ev',0,'Which metric is the share of correct predictions?','Accuracy',['Latency','Bandwidth','Font size'],'Accuracy = correct predictions / total predictions.','Accuracy is the share of correct predictions.','Accuracy measures training time.'),
K('ev',1,'What is overfitting?','Memorising training data and failing on new data',['The model is too simple','Training is too fast','The data has no labels'],'An overfit model does well on training data but poorly on unseen data.','Overfit models generalise poorly.','Overfitting means the model is too simple.'),
K('ev',2,'Why can accuracy mislead on imbalanced data?','Predicting only the majority class can still score high',['Accuracy cannot be computed','It ignores the test set','It only works for regression'],'Precision, recall or F1 give a fuller picture when classes are imbalanced.','Accuracy can mislead on imbalanced data.','Accuracy is always the best metric.')];
const map:[RegExp,string[]][]=[[/artificial|\bai\b|intelligence/i,['ai','ml']],[/machine learning|\bml\b/i,['ml','sup','ev']],[/(?<!un)supervised|classif|regress/i,['sup']],[/neural|deep learning/i,['nn']],[/overfit|evaluat|accuracy|metric/i,['ev']]];
export const SUPPORTED='Artificial intelligence, Machine learning, Supervised learning, Neural networks, Model evaluation';
const D=['Easy','Medium','Hard'];
function pool(topic:string,diff:string){const keys=new Set(map.filter(([r])=>r.test(topic)).flatMap(([,k])=>k));const t=D.indexOf(diff);
 return bank.map((b,src)=>({b,src})).filter(x=>keys.has(x.b[0])).sort((a,c)=>Math.abs(a.b[1]-t)-Math.abs(c.b[1]-t)||a.src-c.src)}
let uid=1;
function build(x:{b:Item;src:number},type:string):Q{const [,d,q,a,w,exp,t,f]=x.b;const id=`q${Date.now()}-${uid++}`,diff=D[d];
 if(type==='True/False'){const v=Math.random()>.5;return{id,type,q:v?t:f,options:['True','False'],answer:v?'True':'False',exp,diff,src:x.src}}
 if(type==='Short answer')return{id,type,q:q+' (answer briefly)',answer:a,exp,diff,src:x.src};
 return{id,type:'Multiple choice',q,options:[...w,a].sort(()=>Math.random()-.5),answer:a,exp,diff,src:x.src}}
export async function generateQuiz(topic:string,n:number,type:string,diff:string){await delay(700);const p=pool(topic,diff);
 if(!p.length)throw new Error(`No verified demo template for "${topic}". Supported demo topics: ${SUPPORTED}.`);
 return{qs:p.slice(0,n).map(x=>build(x,type)),note:p.length<n?`Only ${p.length} verified questions exist for this topic in the demo, so ${p.length} were generated.`:''}}
export function regenQ(topic:string,type:string,diff:string,cur:Q[]):Q|null{const used=new Set(cur.map(q=>q.src));const x=pool(topic,diff).find(y=>!used.has(y.src));return x?build(x,type):null}
export const CRITERIA=[{name:'Correctness',max:40,rx:/result|complet|work|correct|output/i},{name:'Clarity',max:30,rx:/explain|approach|because|step|reason/i},{name:'Testing',max:20,rx:/test|verif|check|validat/i},{name:'Presentation',max:10,rx:/[\s\S]{100,}/}];
export interface FB{signals:{name:string;max:number;found:boolean}[];draft:string}
export async function generateFeedback(title:string,text:string):Promise<FB>{await delay(600);const signals=CRITERIA.map(c=>({name:c.name,max:c.max,found:c.rx.test(text)}));
 const ok=signals.filter(s=>s.found).map(s=>`- ${s.name}: the submission shows signs of this (keyword check only).`),no=signals.filter(s=>!s.found).map(s=>`- ${s.name}: not clearly evident. Please add more detail.`);
 const edge=/edge|unsure|error|invalid/i.test(text)?'- Say how you would handle the edge cases you mentioned.':'- Consider edge cases and invalid inputs.';
 return{signals,draft:`Feedback on "${title}" (simulated draft, based on keyword signals in the submission text)\n\nStrengths:\n${ok.join('\n')||'- None detected automatically. Please review manually.'}\n\nImprovements:\n${no.join('\n')||'- No gaps detected automatically.'}\n${edge}\n\nNext steps:\n- Revisit the practice set related to "${title}".\n- Resubmit a short note explaining your approach and how you tested it.`}}
const rules:[RegExp,string,string[]][]=[
 [/difference.*(ai|ml)|(ai|ml).*difference/i,'AI is the broad goal of making machines act intelligently. ML is one way to get there: the system learns patterns from data instead of following hand-written rules. Example: a chess program with fixed rules is AI; a spam filter that learns from past emails is ML.',['What is supervised learning?','Explain neural networks in simple language']],
 [/supervised/i,'Supervised learning trains a model on examples that already have the right answers (labels). Example: show it thousands of emails marked "spam" or "not spam", and it learns to label new ones.',['What is the difference between AI and ML?','Explain neural networks in simple language']],
 [/neural/i,'A neural network is a system of simple connected units (neurons) arranged in layers. Each unit takes numbers in, weighs them and passes a result on. With many examples, the weights adjust until the network gives good answers, like recognising handwritten digits.',['What is supervised learning?','Explain Machine Learning with an example']],
 [/machine learning|\bml\b/i,'Machine learning lets computers learn patterns from data. Example: a streaming app learns what you like from what you watched and suggests similar shows.',['What is supervised learning?','What is the difference between AI and ML?']],
 [/artificial intelligence|\bai\b/i,'Artificial Intelligence is the field of building systems that do tasks that normally need human intelligence, such as understanding language, recognising images or making decisions. Example: a voice assistant understanding your question.',['What is the difference between AI and ML?','Explain Machine Learning with an example']]];
export async function chatReply(m:string):Promise<{text:string;follow:string[];sure:boolean}>{await delay(800);
 for(const [re,text,follow] of rules)if(re.test(m))return{text,follow,sure:true};
 return{text:"I'm not confident I can answer that correctly, and I'd rather not guess. Please check the verified course material for this topic or ask your trainer.",follow:['What is Artificial Intelligence?','What is supervised learning?'],sure:false}}
