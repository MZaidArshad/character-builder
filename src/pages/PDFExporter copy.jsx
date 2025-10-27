import React from "react";
import { usePDF } from "react-to-pdf";

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

  return (
    <>
      <button onClick={() => toPDF()} className="btn btn-success">
        Export PDF
      </button>

      {/* PDF Content */}
      <div ref={targetRef} style={{ position: "absolute", left: "-9999px" }}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap');
          
          .pdf-container {
            font-family: 'Crimson Text', serif;
            width: 8.5in;
            background: white;
          }
          
          .pdf-page {
            font-family: 'Crimson Text', serif;
            width: 8.5in;
            min-height: 11in;
            padding: 0.5in;
            background: white;
            color: #000;
            box-sizing: border-box;
            position: relative;
          }
          
          .pdf-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #000;
            padding-bottom: 10px;
          }
          
          .pdf-title {
            font-size: 32px;
            font-weight: 700;
            margin: 0 0 5px 0;
            letter-spacing: 1px;
          }
          
          .pdf-date {
            font-size: 11px;
            color: #333;
            position: absolute;
            top: 0.5in;
            left: 0.5in;
          }
          
          .pdf-sheet-title {
            font-size: 11px;
            color: #333;
            position: absolute;
            top: 0.5in;
            right: 0.5in;
          }
          
          .pdf-section {
            margin-bottom: 25px;
          }
          
          .pdf-section-title {
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0 0 8px 0;
            padding-bottom: 5px;
            border-bottom: 2px solid #000;
            letter-spacing: 0.5px;
          }
          
          .pdf-subsection-title {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            margin: 15px 0 8px 0;
            color: #999;
            letter-spacing: 0.5px;
          }
          
          .pdf-two-column {
            display: flex;
            gap: 30px;
          }
          
          .pdf-column {
            flex: 1;
          }
          
          .pdf-field {
            margin-bottom: 15px;
          }
          
          .pdf-field-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 3px;
            letter-spacing: 0.3px;
          }
          
          .pdf-field-value {
            font-size: 14px;
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
            min-height: 24px;
          }
          
          .pdf-stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px 20px;
            margin-top: 10px;
          }
          
          .pdf-stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
          }
          
          .pdf-stat-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
          }
          
          .pdf-stat-value {
            font-size: 14px;
            font-weight: 600;
          }
          
          .pdf-health-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 15px 0;
            padding: 10px;
            border: 2px solid #000;
          }
          
          .pdf-health-item {
            text-align: center;
            flex: 1;
          }
          
          .pdf-health-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          
          .pdf-health-value {
            font-size: 18px;
            font-weight: 700;
          }
          
          .pdf-health-fraction {
            font-size: 16px;
          }
          
          .pdf-health-note {
            font-size: 9px;
            color: #666;
            margin-top: 3px;
            max-width: 150px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .pdf-logo {
            text-align: center;
            margin: 20px 0;
          }
          
          .pdf-logo-text {
            font-size: 48px;
            font-weight: 700;
            color: #8B4513;
            text-shadow: 2px 2px 0px #D4AF37;
            font-style: italic;
          }
          
          .pdf-fame-grid {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin: 20px 0;
          }
          
          .pdf-fame-item {
            text-align: center;
          }
          
          .pdf-fame-label {
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 8px;
          }
          
          .pdf-fame-value {
            font-size: 20px;
            font-weight: 700;
          }
          
          .pdf-text-area {
            margin-bottom: 15px;
          }
          
          .pdf-text-content {
            font-size: 11px;
            line-height: 1.4;
            white-space: pre-wrap;
            min-height: 40px;
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
          }
          
          .pdf-footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            font-size: 9px;
            color: #666;
          }
          
          .pdf-footer-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 5px;
            color: #999;
          }
          
          .pdf-skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px 20px;
            margin-top: 10px;
          }
          
          .pdf-skill-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 3px 0;
            font-size: 11px;
          }
          
          .pdf-skill-name {
            font-weight: 600;
            text-transform: capitalize;
          }
          
          .pdf-skill-value {
            font-weight: 700;
          }
        `,
          }}
        />

        <div className="pdf-container">
          {/* Page 1 */}
          <div className="pdf-page">
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
              <h1 className="pdf-title">Reduced Character Sheet</h1>
            </div>

            <div className="pdf-two-column">
              {/* Left Column */}
              <div className="pdf-column">
                <div className="pdf-section">
                  <h2 className="pdf-section-title">Character</h2>

                  <div className="pdf-logo">
                    <div className="pdf-logo-text">Will &amp; Whispers</div>
                  </div>

                  <div className="pdf-field">
                    <div className="pdf-field-label">Moniker</div>
                    <div className="pdf-field-value">
                      {character.name || "Name"}
                    </div>
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
              <div className="pdf-column">
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

                <div className="pdf-section">
                  <h3 className="pdf-subsection-title">Personality</h3>

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
              </div>
            </div>

            <div className="pdf-footer">
              <div className="pdf-footer-title">About This Sheet</div>
              <div>https://www.willandwhispers.com/</div>
              <div>Copyright © 2025 by Inquisitive Studios LLC.</div>
              <div style={{ marginTop: "5px" }}>
                *This Fari character sheet was independently designed by
                Inquisitive Studios.
              </div>
            </div>
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
