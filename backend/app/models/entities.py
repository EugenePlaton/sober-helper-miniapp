from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship

from .base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=True)
    password_hash = Column(String, nullable=True)
    telegram_id = Column(String, unique=True, index=True, nullable=True)
    language = Column(String, default="en")
    dependency_type = Column(String, nullable=True)
    quit_date = Column(Date, nullable=True)
    motivation = Column(Text, nullable=True)
    goal = Column(String, nullable=True)
    assistant_persona = Column(String, default="calm")
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    habits = relationship("Habit", back_populates="user")
    check_ins = relationship("CheckIn", back_populates="user")
    journals = relationship("Journal", back_populates="user")
    chat_history = relationship("ChatHistory", back_populates="user")
    chat_summary = relationship("ChatSummary", back_populates="user", uselist=False)
    settings = relationship("Settings", back_populates="user", uselist=False)
    subscription = relationship("Subscription", back_populates="user", uselist=False)
    referral_code = relationship("ReferralCode", back_populates="owner", uselist=False)


class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String, nullable=False)
    description = Column(Text, nullable=True)

    user = relationship("User", back_populates="habits")


class CheckIn(Base):
    __tablename__ = "check_ins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mood = Column(Integer, nullable=True)
    craving_level = Column(Integer, nullable=True)
    triggers = Column(Text, nullable=True)
    help_text = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    slipped = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="check_ins")


class Journal(Base):
    __tablename__ = "journals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="journals")


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    assistant_type = Column(String, default="calm")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chat_history")


class ChatSummary(Base):
    __tablename__ = "chat_summaries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    summary = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chat_summary")


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    theme = Column(String, default="light")
    notifications_enabled = Column(Boolean, default=True)
    language = Column(String, default="en")

    user = relationship("User", back_populates="settings")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    plan = Column(String, default="free")
    limits = Column(Text, nullable=True)
    active = Column(Boolean, default=True)

    user = relationship("User", back_populates="subscription")


class ReferralCode(Base):
    __tablename__ = "referral_codes"

    id = Column(Integer, primary_key=True, index=True)
    owner_user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    code = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="referral_code")
    events = relationship("ReferralEvent", back_populates="referrer")


class ReferralEvent(Base):
    __tablename__ = "referral_events"

    id = Column(Integer, primary_key=True, index=True)
    invited_user_id = Column(Integer, ForeignKey("users.id"))
    referrer_user_id = Column(Integer, ForeignKey("users.id"))
    reward_given = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    referrer = relationship("ReferralCode", back_populates="events", primaryjoin="ReferralCode.owner_user_id==ReferralEvent.referrer_user_id")
