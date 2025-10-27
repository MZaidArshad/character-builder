import React from "react";
import { usePDF } from "react-to-pdf";
import "./pdfExporter.css";
import logo from "../assets/logo.png";
import dice1 from "../assets/Capture-removebg-preview.png";
import dice2 from "../assets/Capture-removebg-preview (1).png";
import dice3 from "../assets/Capture-removebg-preview (2).png";
import clock1 from "../assets/Capture-removebg-preview (3).png";
import clock2 from "../assets/Capture-removebg-preview (4).png";
import clock3 from "../assets/Capture-removebg-preview (5).png";
const PDFExporter = ({
  character,
  calculateStamina,
  calculateInitiative,
  calculateSpeed,
}) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${character.name || "character"}-sheet.pdf`,
    page: {
      margin: 0.5,
      format: "letter",
      orientation: "portrait",
    },
  });

  const stamina = calculateStamina();
  const initiative = calculateInitiative();
  const speed = calculateSpeed();
  const actionPoints =
    2 * character.stats.endurance - character.trackers.woundedStage;

  const PageHeaders = () => {
    return (
      <div className="pdf-headers">
        <div className="pdf-date">
          {new Date().toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
        <div className="pdf-sheet-title">Reduced Character Sheet | Fari</div>
      </div>
    );
  };

  return (
    <>
      <button onClick={() => toPDF()} className="btn btn-success">
        Export PDF
      </button>

      {/* PDF Content */}
      <div ref={targetRef} style={{ position: "absolute", left: "0" }}>
        <div className="pdf-container">
          {/* Page 1 */}
          <div className="pdf-page">
            <PageHeaders />

            <div className="pdf-main-header">
              <h1 className="pdf-title">Reduced Character Sheet</h1>
            </div>

            <div className="pdf-two-column">
              {/* Left Column */}
              <div className="pdf-column">
                <div className="pdf-section">
                  <h2 className="pdf-section-title">Character</h2>

                  <div className="pdf-logo">
                    {/* <div className="pdf-logo-text">Will &amp; Whispers</div> */}
                    <img src={logo} alt="logo" className="pdf-logo_logo" />
                  </div>

                  <div className="pdf-field">
                    <h3
                      className="pdf-subsection-title"
                      style={{ marginBottom: "15px" }}
                    >
                      Character
                    </h3>
                    <div className="pdf-field-label">
                      {character.name || "Name"}
                    </div>
                    <div className="pdf-field-value"></div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Species</div>
                    <div className="pdf-field-value">
                      {character.species || ""}
                    </div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Background</div>
                    <div className="pdf-field-value">
                      {character.background || ""}
                    </div>
                  </div>
                </div>

                <div className="pdf-section">
                  <h3 className="pdf-subsection-title">Qualities</h3>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Perks</div>
                    <div className="pdf-text-content">
                      {character.textSections.perks || ""}
                    </div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Quirks</div>
                    <div className="pdf-text-content">
                      {character.textSections.quirks || ""}
                    </div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Traits</div>
                    <div className="pdf-text-content">
                      {character.textSections.abilities || ""}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="pdf-column margin-top">
                <div className="pdf-section">
                  <h3 className="pdf-subsection-title">Reputation</h3>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Titles</div>
                    <div className="pdf-field-value"></div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Goals</div>
                    <div className="pdf-field-value"></div>
                  </div>

                  <div className="pdf-fame-grid">
                    <div className="pdf-fame-item">
                      <div className="pdf-fame-label">Fame</div>
                      <div className="pdf-fame-value">
                        {character.trackers.fameInfamy || 0}
                      </div>
                    </div>
                    <div className="pdf-fame-item">
                      <div className="pdf-fame-label">Infamy</div>
                      <div className="pdf-fame-value">0</div>
                    </div>
                  </div>
                </div>

                <div className="pdf-section grid-2-columns">
                  <h3
                    className="pdf-subsection-title"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    Personality
                  </h3>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Vows</div>
                    <div className="pdf-field-value"></div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Bonds</div>
                    <div className="pdf-field-value"></div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Ideals</div>
                    <div className="pdf-field-value"></div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Flaws</div>
                    <div className="pdf-field-value"></div>
                  </div>
                </div>

                <div className="pdf-section">
                  <h3 className="pdf-subsection-title">Notes</h3>
                  <div className="pdf-text-content">
                    {character.textSections.notes || ""}
                  </div>
                </div>
                <div className="pdf-section">
                  <h3 className="pdf-subsection-title">About this sheet</h3>
                  <div
                    className="pdf-text-content"
                    style={{ borderBottom: "none" }}
                  >
                    <div
                      style={{
                        color: "#415f9c",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      https://www.willandwhispers.com/
                    </div>
                    <div
                      style={{
                        color: "#5e5e5e",
                        fontSize: "13px",
                        marginTop: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      Copyright © 2025 by Inquisitive Studios LLC.
                    </div>
                    <div
                      style={{
                        color: "#5e5e5e",
                        fontSize: "13px",
                        marginTop: "5px",
                        marginBottom: "15px",
                      }}
                    >
                      *This Fari character sheet was independently designed by
                      Inquisitive Studios.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="pdf-footer">
              <div className="pdf-footer-title">About This Sheet</div>
              <div>https://www.willandwhispers.com/</div>
              <div>Copyright © 2025 by Inquisitive Studios LLC.</div>
              <div style={{ marginTop: "5px" }}>
                *This Fari character sheet was independently designed by
                Inquisitive Studios.
              </div>
            </div> */}
          </div>

          {/* Page 2 */}
          <div
            className="pdf-page pdf-skills-page"
            style={{ pageBreakBefore: "always" }}
          >
            <div className="pdf-date">
              {new Date().toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="pdf-sheet-title">
              Reduced Character Sheet | Fari
            </div>

            <div className="pdf-header">
              <h1 className="pdf-title" style={{ fontSize: "24px" }}>
                Stats / Skills
              </h1>
            </div>

            <div className="pdf-section pdf-health-section">
              <h3 className="pdf-subsection-title">Health</h3>

              <div className="pdf-health-bar">
                <div className="pdf-health-item">
                  <div className="pdf-health-label">Stamina</div>
                  <div className="pdf-health-value">
                    <span className="pdf-health-fraction">{stamina}</span>
                    {" / "}
                    <span className="pdf-health-fraction">{stamina}</span>
                  </div>
                  <div className="pdf-health-note">
                    STAMINA = (END + STR ÷ 2) + bonuses
                  </div>
                </div>

                <div className="pdf-health-item">
                  <div className="pdf-health-label">Wounded Stage</div>
                  <div className="pdf-health-value">
                    {character.trackers.woundedStage || 0}
                  </div>
                  <div className="pdf-health-note">
                    -1 AP for each stage of Wounded. Wound Threshold is quarter
                    of their total HP (rounded up).
                  </div>
                </div>

                <div className="pdf-health-item">
                  <div className="pdf-health-label">Death Save</div>
                  <div className="pdf-health-value">0</div>
                  <div className="pdf-health-note">Coin Flip</div>
                </div>
              </div>

              <div className="pdf-health-bar">
                <div className="pdf-health-item">
                  <div className="pdf-health-label">Initiative</div>
                  <div className="pdf-health-value">{initiative}</div>
                  <div className="pdf-health-note">DEX + bonuses</div>
                </div>

                <div className="pdf-health-item">
                  <div className="pdf-health-label">Armor</div>
                  <div className="pdf-health-value">
                    <span className="pdf-health-fraction">
                      {character.trackers.armor || 0}
                    </span>
                    {" / "}
                    <span className="pdf-health-fraction">0</span>
                  </div>
                  <div className="pdf-health-note">
                    AV of equipment + bonuses
                  </div>
                </div>

                <div className="pdf-health-item">
                  <div className="pdf-health-label">Action Points</div>
                  <div className="pdf-health-value">
                    <span className="pdf-health-fraction">
                      {actionPoints >= 0 ? actionPoints : 0}
                    </span>
                    {" / "}
                    <span className="pdf-health-fraction">
                      {2 * character.stats.endurance}
                    </span>
                  </div>
                  <div className="pdf-health-note">
                    2 × ENDURANCE - Wounded Stage (Rounded down)
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "15px",
                }}
              >
                <div className="pdf-health-item">
                  <div className="pdf-health-label">Speed</div>
                  <div className="pdf-health-value">{speed}</div>
                </div>

                <div className="pdf-health-item">
                  <div className="pdf-health-label">Presence</div>
                  <div className="pdf-health-value">
                    {character.trackers.presence || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="pdf-section">
              <h2 className="pdf-section-title">Stats</h2>
              <div className="pdf-stats-grid">
                {Object.entries(character.stats).map(([stat, value]) => (
                  <div key={stat} className="pdf-stat-item">
                    <span className="pdf-stat-label">
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}
                    </span>
                    <span className="pdf-stat-value">{value}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* <div className="pdf-section">
              <h2 className="pdf-section-title">Skills</h2>
              <div className="pdf-skills-grid">
                {Object.entries(character.skills).map(([skill, value]) => {
                  const isSpecialized =
                    character.specializations.includes(skill);
                  return (
                    <div key={skill} className="pdf-skill-item">
                      <span className="pdf-skill-name">
                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                        {isSpecialized && " ⭐"}
                      </span>
                      <span className="pdf-skill-value">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div> */}

            <div className="pdf-section">
              <h2 className="pdf-section-title pdf-section-title-without-before">
                Critical Injuries
              </h2>
              <div className="pdf-text-content" style={{ minHeight: "60px" }}>
                {character.textSections.injuries || ""}
              </div>
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title pdf-section-title-without-before">
                Mental Injuries
              </h2>
              <div
                className="pdf-text-content"
                style={{ minHeight: "60px" }}
              ></div>
            </div>

            <div className="pdf-section">
              <h3 className="pdf-subsection-title">Dice Roller</h3>
              <div className="pdf-dice-section-para">
                HOVER OVER DICE NAMES TO SET DICE QUANTITY. LEFT CLICK ICONS TO
                ROLL. RIGHT CLICK ICONS TO ADD TO POOL.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img src={dice1} style={{ fontSize: "24px" }}></img>
                  <div className="pdf-dice-section-para">D4</div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    gap: "5px",

                    alignItems: "center",
                  }}
                >
                  <img src={dice2} style={{ fontSize: "24px" }}></img>
                  <div className="pdf-dice-section-para">D6</div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    gap: "5px",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={dice3} style={{ fontSize: "24px" }}></img>
                  <div className="pdf-dice-section-para">D8</div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 3 - Equipment & Spells */}
          {/* <div className="pdf-page" style={{ pageBreakBefore: "always" }}>
            <div className="pdf-date">
              {new Date().toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="pdf-sheet-title">
              Reduced Character Sheet | Fari
            </div>

            <div className="pdf-header">
              <h1 className="pdf-title" style={{ fontSize: "24px" }}>
                Equipment & Abilities
              </h1>
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title">Weapons</h2>
              <div className="pdf-text-content" style={{ minHeight: "100px" }}>
                {character.textSections.weapons || ""}
              </div>
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title">Spells / Abilities</h2>
              <div className="pdf-text-content" style={{ minHeight: "100px" }}>
                {character.textSections.spells || ""}
              </div>
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title">Gear</h2>
              <div className="pdf-text-content" style={{ minHeight: "100px" }}>
                {character.textSections.gear || ""}
              </div>
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title">Items</h2>
              <div className="pdf-text-content" style={{ minHeight: "100px" }}>
                {character.textSections.items || ""}
              </div>
            </div>
          </div> */}
          {/* Page 4 - Clocks, Stats, Skills */}
          <div className="pdf-page">
            <h3
              className="pdf-subsection-title"
              style={{ marginBottom: "15px", textAligns: "start" }}
            >
              CLOCKS
            </h3>

            <div className="pdf-clock-img-box">
              <img src={clock1} alt="" />
              <img src={clock2} alt="" />
              <img src={clock3} alt="" />
            </div>
            <div className="pdf-stats-and-limit-main-box">
              <div className="pdf-stats-and-limit-main-box-inner">
                <h3
                  className="pdf-subsection-title"
                  style={{ marginBottom: "15px", textAligns: "start" }}
                >
                  STATS
                </h3>
                <p>
                  Your active stats determine your character's capabilities in
                  various situations.
                </p>
                <ol className="pdf-ol">
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      STR
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      END
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      DEX
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      MND
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      WIL
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      SPR
                    </h3>
                  </li>
                </ol>
              </div>
              <div className="pdf-stats-and-limit-main-box-inner">
                <h3
                  className="pdf-subsection-title"
                  style={{ marginBottom: "15px", textAligns: "start" }}
                >
                  LIMITS
                </h3>
                <p>
                  Your active stats determine your character's capabilities in
                  various situations.
                </p>
                <ol className="pdf-ol">
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      STR
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      END
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      DEX
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      MND
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      WIL
                    </h3>
                  </li>
                  <li>
                    <h3
                      className="pdf-health-label"
                      style={{ marginBottom: "15px", textAligns: "start" }}
                    >
                      SPR
                    </h3>
                  </li>
                </ol>
              </div>
            </div>
            <h3
              className="pdf-subsection-title"
              style={{ marginBottom: "15px", textAligns: "start" }}
            >
              Skills
            </h3>
            <p style={{ textAlign: "start" }}>
              Skills represent learned abilities your character has acquired
            </p>
          </div>
          {/* page 4 */}
          <div className="pdf-page">
            <div className="page4-pdf-header">
              <h3
                className="pdf-subsection-title"
                style={{ marginBottom: "15px", textAligns: "start" }}
              >
                STRNGTH
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{ marginBottom: "15px", textAligns: "start" }}
              >
                ENDURANCE
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{ marginBottom: "15px", textAligns: "start" }}
              >
                DEXTERITY
              </h3>
            </div>
            <div className="page4-pdf-subheader">
              <div className="page4-pdf-subheader-inner-box">
                <h4>// ATHLETICS //</h4>
                <h6>DEX</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>/// HUNTING ///</h4>
                <h6>MND</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// BLADES //</h4>
                <h6>DEX</h6>
              </div>
            </div>
            <div className="page4-pdf-subheader-values-box">
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
            </div>
            <div className="page4-pdf-header page4-pdf-header-second">
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
            </div>
            <div className="page4-pdf-speclization-value-box">
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
            </div>
            <div className="page4-pdf-subheader">
              <div className="page4-pdf-subheader-inner-box">
                <h4>// BLUNT //</h4>
                <h6>DEX</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// SCAVENGING //</h4>
                <h6>MND</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// CORRDINATION //</h4>
                <h6>DEX</h6>
              </div>
            </div>
            <div className="page4-pdf-subheader-values-box">
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
            </div>
            <div className="page4-pdf-header page4-pdf-header-second">
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
            </div>
            <div className="page4-pdf-speclization-value-box">
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
            </div>

            <div className="page4-pdf-subheader">
              <div className="page4-pdf-subheader-inner-box">
                <h4>// TRAVERSAL //</h4>
                <h6>DEX</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// VITALITY //</h4>
                <h6>MND</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// STEALTH //</h4>
                <h6>DEX</h6>
              </div>
            </div>
            <div className="page4-pdf-subheader-values-box">
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
            </div>
            <div className="page4-pdf-header page4-pdf-header-second">
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
            </div>
            <div className="page4-pdf-speclization-value-box">
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
            </div>
          </div>
          {/* End of PDF Pages */}
          {/* page 5 */}
          <div className="pdf-page">
            <div className="page4-pdf-header">
              <h3
                className="pdf-subsection-title"
                style={{ marginBottom: "15px", textAligns: "start" }}
              >
                MIND
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{ marginBottom: "15px", textAligns: "start" }}
              >
                WILL POWER
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{ marginBottom: "15px", textAligns: "start" }}
              >
                SPIRIT
              </h3>
            </div>
            <div className="page4-pdf-subheader">
              <div className="page4-pdf-subheader-inner-box">
                <h4>// AWARENCE //</h4>
                <h6>DEX</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// COMMUNCIATION //</h4>
                <h6>MND</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// CHANNELING //</h4>
                <h6>DEX</h6>
              </div>
            </div>
            <div className="page4-pdf-subheader-values-box">
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
            </div>
            <div className="page4-pdf-header page4-pdf-header-second">
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
            </div>
            <div className="page4-pdf-speclization-value-box">
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
            </div>
            <div className="page4-pdf-subheader">
              <div className="page4-pdf-subheader-inner-box">
                <h4>// BLUNT //</h4>
                <h6>DEX</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// SCAVENGING //</h4>
                <h6>MND</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// CORRDINATION //</h4>
                <h6>DEX</h6>
              </div>
            </div>
            <div className="page4-pdf-subheader-values-box">
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
            </div>
            <div className="page4-pdf-header page4-pdf-header-second">
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
            </div>
            <div className="page4-pdf-speclization-value-box">
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
            </div>

            <div className="page4-pdf-subheader">
              <div className="page4-pdf-subheader-inner-box">
                <h4>// TRAVERSAL //</h4>
                <h6>DEX</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// VITALITY //</h4>
                <h6>MND</h6>
              </div>
              <div className="page4-pdf-subheader-inner-box">
                <h4>// STEALTH //</h4>
                <h6>DEX</h6>
              </div>
            </div>
            <div className="page4-pdf-subheader-values-box">
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
              <div className="page4-pdf-subheader-values-inner-box">
                <h4>BASE</h4>
                <h6>1</h6>
              </div>
            </div>
            <div className="page4-pdf-header page4-pdf-header-second">
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
              <h3
                className="pdf-subsection-title"
                style={{
                  marginBottom: "15px",
                  textAligns: "start",
                  color: "black",
                }}
              >
                SPECILIZATION
              </h3>
            </div>
            <div className="page4-pdf-speclization-value-box">
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
              <div className="page4-pdf-speclization-value-inner-box"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFExporter;
