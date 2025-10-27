import React from "react";
import { usePDF } from "react-to-pdf";
import "./pdfExporter.css";
import logo from "../assets/logo.png";
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
          <div className="pdf-page" style={{ pageBreakBefore: "always" }}>
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

            <div className="pdf-section">
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

            <div className="pdf-section">
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
            </div>

            <div className="pdf-section">
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
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title">Critical Injuries</h2>
              <div className="pdf-text-content" style={{ minHeight: "60px" }}>
                {character.textSections.injuries || ""}
              </div>
            </div>

            <div className="pdf-section">
              <h2 className="pdf-section-title">Mental Injuries</h2>
              <div
                className="pdf-text-content"
                style={{ minHeight: "60px" }}
              ></div>
            </div>

            <div className="pdf-section">
              <h3 className="pdf-subsection-title">Dice Roller</h3>
              <div style={{ fontSize: "10px", marginBottom: "10px" }}>
                HOVER OVER DICE NAMES TO SET DICE QUANTITY. LEFT CLICK ICONS TO
                ROLL. RIGHT CLICK ICONS TO ADD TO POOL.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px" }}>▲</div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>D4</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px" }}>⬢</div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>D6</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px" }}>◆</div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>D8</div>
                </div>
              </div>
            </div>
          </div>

          {/* Page 3 - Equipment & Spells */}
          <div className="pdf-page" style={{ pageBreakBefore: "always" }}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFExporter;
