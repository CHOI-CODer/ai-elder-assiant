"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CHAT_URL = "https://choi-coder.github.io/ai-for-elder/";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

const medicines = [
  {
    name: "硝苯地平控释片",
    time: "早、晚饭后",
    dose: "1片",
    image: asset("/assets/medicine-nifedipine.png"),
  },
  {
    name: "苯磺酸氨氯地平",
    time: "早饭后",
    dose: "1片",
    image: asset("/assets/medicine-amlodipine.png"),
  },
  {
    name: "纳豆红曲胶囊",
    time: "晚饭后",
    dose: "3粒",
    image: asset("/assets/medicine-natto.png"),
  },
];

type PageName = "doctor" | "records";
type FamilyMember = "女儿" | "儿子";

export default function Home() {
  const [page, setPage] = useState<PageName>("doctor");
  const [medicationCompleted, setMedicationCompleted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<FamilyMember | null>(null);
  const [notice, setNotice] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const voiceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (voiceTimerRef.current) clearTimeout(voiceTimerRef.current);
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    };
  }, []);

  function changePage(nextPage: PageName) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCallDialog(member: FamilyMember) {
    setSelectedFamily(member);
    dialogRef.current?.showModal();
  }

  function closeCallDialog() {
    dialogRef.current?.close();
    setSelectedFamily(null);
  }

  useEffect(() => {
    if (!selectedFamily) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        dialogRef.current?.close();
        setSelectedFamily(null);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedFamily]);

  function confirmCall() {
    if (!selectedFamily) return;
    const member = selectedFamily;
    closeCallDialog();
    setNotice(`正在拨打${member}……`);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => setNotice(""), 2200);
  }

  function playVoiceMessage() {
    setPlaying(true);
    if (voiceTimerRef.current) clearTimeout(voiceTimerRef.current);
    voiceTimerRef.current = setTimeout(() => setPlaying(false), 3000);
  }

  return (
    <main className="site-stage">
      <section className={`app-shell ${page === "records" ? "records-shell" : ""}`} aria-label="AI智能医生助手">
        <header className="app-header">
          {page === "records" ? (
            <button className="menu-button" type="button" onClick={() => changePage("doctor")} aria-label="返回看医生页面">
              <span />
              <span />
              <span />
            </button>
          ) : (
            <span className="header-spacer" aria-hidden="true" />
          )}

          <div className="brand-title">
            <span className="brand-dot" aria-hidden="true" />
            <span>AI智能医生助手</span>
          </div>

          <div className="verification" aria-label="官方认证">
            <span className="verification-mark" aria-hidden="true">✓</span>
            <span>官方认证</span>
          </div>
        </header>

        {page === "doctor" ? (
          <section className="doctor-page" aria-labelledby="welcome-title">
            <div className="doctor-portrait">
              <Image src={asset("/assets/doctor.png")} alt="AI医生助手头像" width={200} height={200} priority unoptimized />
            </div>

            <div className="welcome-copy">
              <h1 id="welcome-title">您好，有什么能够帮到您？</h1>
              <p>请点击按钮开始对话</p>
            </div>

            <a className="voice-launch" href={CHAT_URL} target="_blank" rel="noopener noreferrer" aria-label="打开 AI 医生对话网页">
              <span className="microphone-disc" aria-hidden="true">
                <Image src={asset("/assets/microphone.svg")} alt="" width={48} height={48} unoptimized />
              </span>
              <span>点击进入</span>
            </a>
          </section>
        ) : (
          <section className="records-page" aria-label="健康档案">
            <article className="content-card medication-card">
              <div className="card-heading">
                <h1>今日用药提醒</h1>
                <div className="heading-actions" aria-label="8月15日用药提醒">
                  <span className="calendar-icon" aria-hidden="true">15</span>
                  <span className="bell-icon" aria-hidden="true">
                    <span />
                  </span>
                </div>
              </div>

              <div className="medicine-grid">
                {medicines.map((medicine) => (
                  <div className="medicine-item" key={medicine.name}>
                    <div className="medicine-image-wrap">
                      <Image src={medicine.image} alt={`${medicine.name}药品图片`} width={122} height={101} unoptimized />
                    </div>
                    <strong>{medicine.name}</strong>
                    <span>{medicine.time}</span>
                    <b>{medicine.dose}</b>
                  </div>
                ))}
              </div>

              <button
                className={`medication-status ${medicationCompleted ? "completed" : "pending"}`}
                type="button"
                onClick={() => setMedicationCompleted((completed) => !completed)}
                aria-live="polite"
              >
                {medicationCompleted ? "已完成服药" : "我还没吃（点击完成）"}
              </button>
            </article>

            <article className="content-card family-card">
              <div className="family-heading">
                <h2>家人关注中</h2>
                <p>
                  <span>检测状况：</span>
                  <strong>正常</strong>
                </p>
              </div>

              <div className="family-grid">
                <button className="family-person" type="button" onClick={() => openCallDialog("女儿")} aria-label="拨打女儿电话">
                  <Image src={asset("/assets/daughter.png")} alt="女儿头像" width={104} height={104} unoptimized />
                  <span>女儿（已查看）</span>
                  <span className="call-circle" aria-hidden="true">❯❯</span>
                </button>

                <button className="family-person" type="button" onClick={() => openCallDialog("儿子")} aria-label="拨打儿子电话">
                  <Image src={asset("/assets/son.png")} alt="儿子头像" width={104} height={104} unoptimized />
                  <span>儿子</span>
                  <span className="call-circle" aria-hidden="true">❯❯</span>
                </button>
              </div>
            </article>

            <button className={`voice-message ${playing ? "is-playing" : ""}`} type="button" onClick={playVoiceMessage} aria-live="polite">
              <span className="play-disc" aria-hidden="true">{playing ? "•••" : "▶"}</span>
              <span>{playing ? "正在播放语音" : "听听女儿的语音嘱托"}</span>
            </button>
          </section>
        )}

        <nav className="bottom-nav" aria-label="主导航">
          <button className={page === "doctor" ? "active" : ""} type="button" onClick={() => changePage("doctor")} aria-current={page === "doctor" ? "page" : undefined}>
            <Image src={asset("/assets/doctor-nav.svg")} alt="" aria-hidden="true" width={31} height={31} unoptimized />
            <span>看医生</span>
          </button>
          <button className={page === "records" ? "active" : ""} type="button" onClick={() => changePage("records")} aria-current={page === "records" ? "page" : undefined}>
            <Image src={asset("/assets/records-nav.svg")} alt="" aria-hidden="true" width={27} height={28} unoptimized />
            <span>健康档案</span>
          </button>
        </nav>

        <dialog
          className="call-dialog"
          ref={dialogRef}
          aria-labelledby="call-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            closeCallDialog();
          }}
          onClose={() => setSelectedFamily(null)}
        >
          <div className="dialog-icon" aria-hidden="true">☎</div>
          <h2 id="call-dialog-title">拨打电话</h2>
          <p>是否拨打{selectedFamily}的电话？</p>
          <div className="dialog-actions">
            <button type="button" onClick={closeCallDialog}>取消</button>
            <button className="confirm" type="button" onClick={confirmCall}>确定</button>
          </div>
        </dialog>

        <div className={`notice ${notice ? "show" : ""}`} role="status" aria-live="polite">
          {notice}
        </div>
      </section>
    </main>
  );
}
