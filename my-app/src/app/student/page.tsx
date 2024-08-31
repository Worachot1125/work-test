"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component from next/image
import "../student/Aboutme.css";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <header>
        <div className="img">
          <Image
            src="/DOM.jpg"
            className="imgPro"
            alt="Profile"
            width={200}
            height={300}
          />
        </div>
      </header>

      <div className="head2">
        <h2>About me</h2>
      </div>

      <div className="Profile">
        <div className="row">
          <div className="info">
            <p>ชื่อ : วรโชติ ทองเลิศ</p>
            <p>รหัสนักศึกษา : 653450299-0</p>
            <p><i className="fa fa-envelope"></i> worachot.t@kkumail.com</p>
            <p>วิทยาการคอมพิวเตอร์และสารสนเทศ</p>
          </div>
        </div>
      </div>

      <div className="contact">
        <h3>Contact me</h3>
        <a href="https://www.facebook.com/profile.php?id=100013024876104" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg"
            alt="Facebook"
            height={30}
            width={40}
          />
        </a>
        <a href="https://www.instagram.com/dom_narai/" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg"
            alt="Instagram"
            height={30}
            width={40}
          />
        </a>
      </div>

      <div className="work">
        <h3>My work</h3>
        <div className="works">
          <h4>OOP</h4>
          <button>
            <a href="https://github.com/Worachot1125/FinalProject" target="_blank" rel="noopener noreferrer">FinalProject</a>
          </button>
          <button>
            <a href="https://github.com/Worachot1125/labEsport" target="_blank" rel="noopener noreferrer">LabEsport</a>
          </button>
          <h4>Front end</h4>
          <p>-</p>
        </div>
      </div>
    </div>
  );
}
