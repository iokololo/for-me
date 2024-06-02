import cheerio from 'cheerio';
import fs from 'fs';
import axios from 'axios';
import connectDB from "../db.js";
import models from "../models/index.js";

const htmlContent = fs.readFileSync('scripts/teachers.html', 'utf8');

const $ = cheerio.load(htmlContent);

const teachers = [];

$('a.block.p-2').each((_, element) => {
    const name = $(element).find('div.text-center span.font-medium').text().trim();
    const imageUrl = $(element).find('img').attr('src');
    const profileUrl = $(element).attr('href').trim();

    teachers.push({
        name,
        imageUrl: imageUrl.startsWith('/') ? `https://iitu.edu.kz${imageUrl}` : imageUrl,
        profileUrl
    });
});

console.log(teachers);
fs.writeFileSync('teachers.json', JSON.stringify(teachers, null, 2), 'utf8');



async function fetchHTML(url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error}`);
      return null;
    }
  }
  

  function extractProfileData(html) {
    const $ = cheerio.load(html);
    const name = $('span.text-3xl').text().trim();
    const position = $('span.font-bold.text-1xl').text().trim();
    const email = $('div.text-center p').last().find('i').text().trim();
    const education = $('article.my-5 div.container').text().trim();
  
    return { name, position, email, education };
  }
  
  async function updateTeachers(teachers) {
    console.log("Started updating teachers!")

    process.env.MONGO_URI = 'mongodb+srv://Aiganym:AiganymAyazhanforever@cluster0.f3jh010.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    await connectDB();

    for(const teacher of teachers){
        const exists = await models.User.findOne({
            email: teacher.email,
            role: "Teacher"
        })

        const data = {
            name: teacher.name,
            email: teacher.email,
            hourlyRate: 10000,
            experience: 10,
            profilePicture: teacher.imageUrl,
            description: teacher.education,
            role: "Teacher",
            password: '$2b$10$mUgaimcNzumZ3ePbGz2AWe31oaOP.92xREIW78hPhIDpCs5CY0RrS',
            isVerified: true,
            verificationCode: "137-E4YW64-EKwOdi-70J9k1-V1B467-KRX71D-133-XDxkeJ-yndqCP-hWnjg3-915-yTmmRr-rV3tYL-5gwcIB-57-z3ezjO-juQQzE-466-114-r1Z6qs-825-wB4e7c-zE80Nq-998",
            age: 30
                 }

        if(exists) {
            await models.User.findOneAndUpdate({
                email: teacher.email,
                role: "Teacher"
            },
            data)

            continue
        }

        await models.User.create(data)

        console.log(`Uploaded teacher: `, teacher.name)
    }
  }

  async function processTeachers(teachers) {
    const detailedTeachers = [];
  
    for (const teacher of teachers) {
      if (!teacher.profileUrl || teacher.profileUrl == '#') {
        continue; 
      }
      const html = await fetchHTML(teacher.profileUrl);
      if (html) {
        const details = extractProfileData(html);
        detailedTeachers.push({ ...teacher, ...details });
      }
    }
  
    console.log(detailedTeachers);
    fs.writeFileSync('detailedTeachers.json', JSON.stringify(detailedTeachers, null, 2), 'utf8');

    await updateTeachers(detailedTeachers)

    console.log("Finished uploading teachers!")
  }
  
  processTeachers(teachers);


  
