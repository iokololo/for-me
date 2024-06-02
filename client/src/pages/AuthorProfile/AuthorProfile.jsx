import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import cl from "./AuthorProfile.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AuthorProducts } from "../../modules/AuthorProducts/AuthorProducts.jsx";
import { EditModalForm } from "../../modules/EditModalForm/EditModalForm.jsx";
import Modal from 'react-modal';
import AuthorService from "../../service/AuthorService.js";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cl.stars}>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};

const localizer = momentLocalizer(moment);

const AuthorProfile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [activeTab, setActiveTab] = useState(location?.state?.url === "courses" ? "courses" : "books");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [lessons, setLessons] = useState([])
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const loadAuthorData = async () => {
      try {
        const response = await AuthorService.getById(id);
        setAuthor(response.data);
        const books = response.data.books || []
        const courses = response.data.courses || [];
        setLessons([...books, ...courses])
      } catch (error) {
        console.error("Error loading author data:", error);
      }
    };

    loadAuthorData();
  }, [id]);

  const handleHireClick = () => {
    setIsHireModalOpen(true);
  };

  const handleHireSubmit = async () => {
    try {
      await AuthorService.hire({
        date: selectedDate,
        slot: selectedSlot,
        lessonId: selectedLesson,
        teacherId: author._id,
        studentId: user._id
      });
      console.log(`Hired ${author.name} on ${selectedDate} at ${selectedSlot} for ${selectedLesson}`);
      setIsHireModalOpen(false);
    } catch (error) {
      console.error("Error hiring author:", error);
    }
  };

  const generateTimeSlots = (start, end) => {
    const slots = [];
    const startTime = moment(start, 'HH:mm A');
    const endTime = moment(end, 'HH:mm A');

    while (startTime <= endTime) {
      slots.push(startTime.format('hh:mm A'));
      startTime.add(1, 'hour');
    }

    return slots;
  };

  const getAvailableTimeSlots = (date, schedule) => {
    const allSlots = generateTimeSlots('08:00 AM', '05:00 PM');
    const bookedSlots = schedule
      .filter(day => day.date === date)
      .flatMap(day => day.slots);

    return allSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    const availableSlots = getAvailableTimeSlots(selectedDate, author.schedule || []);
    setAvailableSlots(availableSlots);
  };

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "";
  };

  if (!author) {
    return <div>Loading...</div>;
  }

  let events = []

  if(author.schedule){
    events = author.schedule.flatMap(day =>
      day.slots.map(slot => ({
        title: "Teaching",
        start: moment(`${day.date} ${slot}`, "YYYY-MM-DD hh:mm A").toDate(),
        end: moment(`${day.date} ${slot}`, "YYYY-MM-DD hh:mm A").add(1, 'hours').toDate()
      }))
    );
  }

  return (
    <div className={cl.root}>
      <div className={cl.bg} />
      <div className={cl.wrapper}>
        <div className={cl.main}>
          <div className={cl.leftSide}>
            <div className={cl.block}>
              <div className={cl.avatar}>
                {author.profilePicture ? (
                  <img src={author.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className={cl.iconText}>{getInitials(`${author.name}`)}</div>
                )}
              </div>
              <div className={cl.name}>{`${author.name}`}</div>
              <div className={cl.email}>
                <Icon name='email' />
                <span className={cl.text}>{author.email}</span>
              </div>
              <div className={cl.phone}>
                <Icon name='phone' />
                <span className={cl.text}>{author.phoneNumber}</span>
              </div>
              <div className={cl.detail}>{`Age: ${author.age}`}</div>
              <div className={cl.detail}>
                Rating: <StarRating rating={author.averageRating} />
              </div>
              <div className={cl.detail}>{`Hourly Rate: $${author.hourlyRate}`}</div>
              <div className={cl.skills}>
                {author.skills.map(skill => <div key={skill} className={cl.skill}>{skill}</div>)}
              </div>
              <button onClick={handleHireClick} className={cl.hireButton}>Hire Me</button>
            </div>
            {isEditModalOpen && (
              <EditModalForm onClose={() => setIsEditModalOpen(false)} />
            )}
          </div>
          <div className={cl.rightSide}>
            <div className={cl.switch}>
              <div
                className={`${cl.switchText} ${activeTab === "books" ? cl.active : ""}`}
                onClick={() => setActiveTab("books")}
              >
                Books
              </div>
              <div
                className={`${cl.switchText} ${activeTab === "courses" ? cl.active : ""}`}
                onClick={() => setActiveTab("courses")}
              >
                Courses
              </div>
            </div>
            <div className={cl.content}>
              {activeTab === "books" && <AuthorProducts isLoading={false} products={author.books} />}
              {activeTab === "courses" && <AuthorProducts isLoading={false} products={author.courses} />}
              <div className={cl.calendar}>
                <h3>Teacher Calendar</h3>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isHireModalOpen}
        onRequestClose={() => setIsHireModalOpen(false)}
        className={cl.modal}
        overlayClassName={cl.overlay}
      >
        <h2>Hire {author.firstName} {author.lastName}</h2>
        <div className={cl.modalContent}>
          <label>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </label>
          <label>
            Select Time Slot:
            <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
              <option value="">Select Time Slot</option>
              {availableSlots.map(slot => (
                <option key={`${selectedDate}-${slot}`} value={slot}>{slot}</option>
              ))}
            </select>
          </label>
          <label>
            Select Lesson:
            <select value={selectedLesson} onChange={(e) => setSelectedLesson(e.target.value)}>
              <option value="">Select Lesson</option>
              {lessons.map(lesson => (
                <option key={lesson._id} value={lesson._id}>{lesson.title[0]}</option>
              ))}
            </select>
          </label>
          <button onClick={handleHireSubmit} className={cl.submitButton}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export { AuthorProfile };