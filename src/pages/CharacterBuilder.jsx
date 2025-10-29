import React, { useState, useEffect, useRef } from "react";
import PDFExporter from "./PDFExporter";
import { Link } from "react-router-dom";
import "./characterBuilder.css";
const CharacterBuilder = () => {
  const initialCharacter = {
    name: "",
    species: "",
    background: "",
    stats: {
      strength: 1,
      endurance: 1,
      dexterity: 1,
      mind: 1,
      willpower: 1,
      spirit: 1,
    },
    skills: {
      athletics: 0,
      stealth: 0,
      perception: 0,
      investigation: 0,
      persuasion: 0,
      intimidation: 0,
      deception: 0,
      insight: 0,
      survival: 0,
      medicine: 0,
      arcana: 0,
      history: 0,
    },
    specializations: [],
    trackers: {
      currentAP: 0,
      maxAP: 0,
      woundedStage: 0,
      armor: 0,
      tempo: 0,
      presence: 0,
      fameInfamy: 0,
      currentHealth: 0,
    },
    textSections: {
      perks: "",
      quirks: "",
      abilities: "",
      spells: "",
      weapons: "",
      gear: "",
      injuries: "",
      items: "",
      notes: "",
    },
  };
  const pdfExporterRef = useRef();
  const [character, setCharacter] = useState(initialCharacter);
  const [savedCharacters, setSavedCharacters] = useState([]);

  const STAT_POINTS = 20;
  const SKILL_POINTS = 15;
  const MAX_SPECIALIZATIONS = 3;

  // Species and Background data
  const speciesData = {
    "": { statMods: {}, speed: 0, perks: [], staminaBonus: 0 },
    Human: {
      statMods: { willpower: 1 },
      speed: 30,
      perks: ["Adaptable"],
      staminaBonus: 2,
    },
    Elf: {
      statMods: { dexterity: 1, mind: 1 },
      speed: 35,
      perks: ["Keen Senses"],
      staminaBonus: 0,
    },
    Dwarf: {
      statMods: { strength: 1, endurance: 1 },
      speed: 25,
      perks: ["Sturdy"],
      staminaBonus: 5,
    },
    Halfling: {
      statMods: { dexterity: 2 },
      speed: 25,
      perks: ["Lucky"],
      staminaBonus: 0,
    },
  };

  const backgroundData = {
    "": { statMods: {}, perks: [], staminaBonus: 0 },
    Soldier: {
      statMods: { strength: 1 },
      perks: ["Combat Training"],
      staminaBonus: 3,
    },
    Scholar: { statMods: { mind: 2 }, perks: ["Well Read"], staminaBonus: 0 },
    Rogue: {
      statMods: { dexterity: 1 },
      perks: ["Street Smart"],
      staminaBonus: 1,
    },
    Noble: {
      statMods: { willpower: 1 },
      perks: ["High Society"],
      staminaBonus: 2,
    },
  };

  const skillsList = [
    "athletics",
    "stealth",
    "perception",
    "investigation",
    "persuasion",
    "intimidation",
    "deception",
    "insight",
    "survival",
    "medicine",
    "arcana",
    "history",
  ];

  // Load saved characters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("willWhispersCharacters");
    if (saved) {
      setSavedCharacters(JSON.parse(saved));
    }
  }, []);

  // Apply species and background modifiers
  useEffect(() => {
    if (character.species || character.background) {
      setCharacter((prev) => {
        const newStats = { ...prev.stats };

        // Reset to base stats first (subtract old modifiers if any)
        // This is handled by the user manually if they change species/background

        return prev;
      });
    }
  }, [character.species, character.background]);

  // Auto-calculate wounded stage based on health loss
  useEffect(() => {
    const maxStamina = calculateStamina();
    const currentHealth = character.trackers.currentHealth;

    if (maxStamina > 0 && currentHealth >= 0) {
      const healthPercentage = (currentHealth / maxStamina) * 100;
      let newWoundedStage = 0;

      if (healthPercentage <= 75) newWoundedStage = 1;
      if (healthPercentage <= 50) newWoundedStage = 2;
      if (healthPercentage <= 25) newWoundedStage = 3;
      if (healthPercentage <= 0) newWoundedStage = 4;

      if (newWoundedStage !== character.trackers.woundedStage) {
        setCharacter((prev) => ({
          ...prev,
          trackers: {
            ...prev.trackers,
            woundedStage: newWoundedStage,
          },
        }));
      }
    }
  }, [character.trackers.currentHealth]);

  // Calculate base stats with modifiers
  const getStatWithModifiers = (statName) => {
    const baseStat = character.stats[statName];
    const speciesMod = speciesData[character.species]?.statMods[statName] || 0;
    const backgroundMod =
      backgroundData[character.background]?.statMods[statName] || 0;
    return baseStat + speciesMod + backgroundMod;
  };

  // Calculate derived stats
  const calculateStamina = () => {
    const baseStr = getStatWithModifiers("strength");
    const baseEnd = getStatWithModifiers("endurance");
    const base = (baseStr + baseEnd) * 2;
    const speciesBonus = speciesData[character.species]?.staminaBonus || 0;
    const backgroundBonus =
      backgroundData[character.background]?.staminaBonus || 0;
    return base + speciesBonus + backgroundBonus;
  };

  const calculateInitiative = () => {
    return Math.ceil(getStatWithModifiers("dexterity") / 2);
  };

  const calculateSpeed = () => {
    return speciesData[character.species]?.speed || 30;
  };

  const calculateEffectiveMaxAP = () => {
    return Math.max(
      0,
      character.trackers.maxAP - character.trackers.woundedStage
    );
  };

  // Calculate stat points spent (base stats only, not including modifiers)
  const calculateStatPointsSpent = () => {
    let spent = 0;
    Object.entries(character.stats).forEach(([stat, value]) => {
      for (let i = 1; i < value; i++) {
        spent += i;
      }
    });
    return spent;
  };

  // Calculate skill points spent
  const calculateSkillPointsSpent = () => {
    let spent = 0;
    Object.values(character.skills).forEach((value) => {
      for (let i = 1; i <= value; i++) {
        spent += i;
      }
    });
    return spent;
  };

  // Get cost for next stat increase
  const getNextStatCost = (stat) => {
    return character.stats[stat];
  };

  const handleStatChange = (stat, newValue) => {
    const value = Math.max(1, Math.min(10, parseInt(newValue) || 1));
    setCharacter((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: value },
    }));
  };

  const handleSkillChange = (skill, change) => {
    const currentValue = character.skills[skill];
    const newValue = Math.max(0, Math.min(10, currentValue + change));

    setCharacter((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skill]: newValue },
    }));
  };

  const toggleSpecialization = (skill) => {
    setCharacter((prev) => {
      const specs = [...prev.specializations];
      const index = specs.indexOf(skill);

      if (index > -1) {
        specs.splice(index, 1);
      } else if (specs.length < MAX_SPECIALIZATIONS) {
        specs.push(skill);
      }

      return { ...prev, specializations: specs };
    });
  };

  const handleTrackerChange = (tracker, value) => {
    setCharacter((prev) => ({
      ...prev,
      trackers: { ...prev.trackers, [tracker]: parseInt(value) || 0 },
    }));
  };

  const handleTextChange = (section, value) => {
    setCharacter((prev) => ({
      ...prev,
      textSections: { ...prev.textSections, [section]: value },
    }));
  };

  const saveCharacter = () => {
    const characterToSave = {
      ...character,
      id: Date.now(),
      savedAt: new Date().toISOString(),
    };

    const updated = [...savedCharacters, characterToSave];
    setSavedCharacters(updated);
    localStorage.setItem("willWhispersCharacters", JSON.stringify(updated));
    alert("Character saved successfully!");
  };

  const loadCharacter = (id) => {
    const char = savedCharacters.find((c) => c.id === id);
    if (char) {
      // Ensure currentHealth exists for older saves
      if (!char.trackers.currentHealth) {
        char.trackers.currentHealth = calculateStamina();
      }
      setCharacter(char);
    }
  };

  const deleteCharacter = (id) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      const updated = savedCharacters.filter((c) => c.id !== id);
      setSavedCharacters(updated);
      localStorage.setItem("willWhispersCharacters", JSON.stringify(updated));
    }
  };

  const newCharacter = () => {
    if (
      window.confirm("Start a new character? Any unsaved changes will be lost.")
    ) {
      setCharacter(initialCharacter);
    }
  };

  const handleExportPDF = () => {
    if (pdfExporterRef.current) {
      pdfExporterRef.current.exportPDF();
    }
  };
  const statPointsRemaining = STAT_POINTS - calculateStatPointsSpent();
  const skillPointsRemaining = SKILL_POINTS - calculateSkillPointsSpent();

  // Get all perks from species and background
  const getAllPerks = () => {
    const speciesPerks = speciesData[character.species]?.perks || [];
    const backgroundPerks = backgroundData[character.background]?.perks || [];
    return [...speciesPerks, ...backgroundPerks];
  };

  return (
    <>
      <Link to="/">Compendium page</Link>
      <div style={styles.container}>
        <header style={styles.header} className="builder-header">
          <h1 style={styles.title}>Will & Whispers Character Builder</h1>
          <div style={styles.headerButtons}>
            <button
              onClick={newCharacter}
              style={{ ...styles.btn, ...styles.btnSecondary }}
            >
              New Character
            </button>
            <button
              onClick={saveCharacter}
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              Save Character
            </button>
            <button
              onClick={handleExportPDF}
              style={{ ...styles.btn, ...styles.btnSuccess }}
            >
              Export PDF
            </button>
          </div>
        </header>

        <div style={styles.mainContent}>
          {/* Basic Info */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Basic Information</h2>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Character Name</label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) =>
                    setCharacter({ ...character, name: e.target.value })
                  }
                  placeholder="Enter character name"
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Species</label>
                <select
                  value={character.species}
                  onChange={(e) =>
                    setCharacter({ ...character, species: e.target.value })
                  }
                  style={styles.select}
                >
                  <option value="">Select Species</option>
                  <option value="Human">Human</option>
                  <option value="Elf">Elf</option>
                  <option value="Dwarf">Dwarf</option>
                  <option value="Halfling">Halfling</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Background</label>
                <select
                  value={character.background}
                  onChange={(e) =>
                    setCharacter({ ...character, background: e.target.value })
                  }
                  style={styles.select}
                >
                  <option value="">Select Background</option>
                  <option value="Soldier">Soldier</option>
                  <option value="Scholar">Scholar</option>
                  <option value="Rogue">Rogue</option>
                  <option value="Noble">Noble</option>
                </select>
              </div>
            </div>

            {/* Display Active Perks */}
            {getAllPerks().length > 0 && (
              <div style={styles.perksDisplay}>
                <strong>Active Perks: </strong>
                {getAllPerks().join(", ")}
              </div>
            )}
          </section>

          {/* Stats */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Main Stats{" "}
              <span
                style={
                  statPointsRemaining < 0
                    ? styles.pointsNegative
                    : styles.pointsRemaining
                }
              >
                (Points Remaining: {statPointsRemaining})
              </span>
            </h2>
            {statPointsRemaining < 0 && (
              <p style={styles.warning}>
                ⚠️ You've exceeded your stat point budget!
              </p>
            )}
            <div style={styles.statsGrid}>
              {Object.entries(character.stats).map(([stat, value]) => {
                const totalValue = getStatWithModifiers(stat);
                const modifier = totalValue - value;
                return (
                  <div key={stat} style={styles.statItem}>
                    <label style={styles.label}>
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}
                      {modifier !== 0 && (
                        <span style={styles.modifier}>
                          {" "}
                          ({value} + {modifier} = {totalValue})
                        </span>
                      )}
                    </label>
                    <div style={styles.statControls}>
                      <button
                        onClick={() => handleStatChange(stat, value - 1)}
                        style={styles.btnControl}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleStatChange(stat, e.target.value)}
                        min="1"
                        max="10"
                        style={styles.statInput}
                      />
                      <button
                        onClick={() => handleStatChange(stat, value + 1)}
                        style={styles.btnControl}
                      >
                        +
                      </button>
                    </div>
                    <small style={styles.costLabel}>
                      Next: costs {getNextStatCost(stat)} pts
                    </small>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Derived Stats */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Derived Stats</h2>
            <div style={styles.derivedStats}>
              <div style={styles.derivedStat}>
                <span style={styles.derivedLabel}>Stamina:</span>
                <span style={styles.derivedValue}>{calculateStamina()}</span>
              </div>
              <div style={styles.derivedStat}>
                <span style={styles.derivedLabel}>Initiative:</span>
                <span style={styles.derivedValue}>{calculateInitiative()}</span>
              </div>
              <div style={styles.derivedStat}>
                <span style={styles.derivedLabel}>Speed:</span>
                <span style={styles.derivedValue}>{calculateSpeed()}</span>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Skills{" "}
              <span
                style={
                  skillPointsRemaining < 0
                    ? styles.pointsNegative
                    : styles.pointsRemaining
                }
              >
                (Points Remaining: {skillPointsRemaining})
              </span>
            </h2>
            <p style={styles.sectionNote}>Select up to 3 specializations</p>
            {skillPointsRemaining < 0 && (
              <p style={styles.warning}>
                ⚠️ You've exceeded your skill point budget!
              </p>
            )}
            <div style={styles.skillsGrid}>
              {skillsList.map((skill) => (
                <div key={skill} style={styles.skillItem}>
                  <div style={styles.skillHeader}>
                    <label style={styles.label}>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </label>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={character.specializations.includes(skill)}
                        onChange={() => toggleSpecialization(skill)}
                        disabled={
                          !character.specializations.includes(skill) &&
                          character.specializations.length >=
                            MAX_SPECIALIZATIONS
                        }
                      />
                      <span>Specialized</span>
                    </label>
                  </div>
                  <div style={styles.skillControls}>
                    <button
                      onClick={() => handleSkillChange(skill, -1)}
                      style={styles.btnControl}
                    >
                      -
                    </button>
                    <span style={styles.skillValue}>
                      {character.skills[skill]}
                    </span>
                    <button
                      onClick={() => handleSkillChange(skill, 1)}
                      style={styles.btnControl}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trackers */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Trackers</h2>
            <div style={styles.trackersGrid}>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Current Health</label>
                <input
                  type="number"
                  value={character.trackers.currentHealth}
                  onChange={(e) =>
                    handleTrackerChange("currentHealth", e.target.value)
                  }
                  placeholder="Current"
                  style={styles.input}
                />
                <small style={styles.helperText}>
                  Max: {calculateStamina()}
                </small>
              </div>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Action Points</label>
                <div style={styles.trackerDual}>
                  <input
                    type="number"
                    value={character.trackers.currentAP}
                    onChange={(e) =>
                      handleTrackerChange("currentAP", e.target.value)
                    }
                    placeholder="Current"
                    style={styles.inputSmall}
                  />
                  <span>/</span>
                  <input
                    type="number"
                    value={character.trackers.maxAP}
                    onChange={(e) =>
                      handleTrackerChange("maxAP", e.target.value)
                    }
                    placeholder="Max"
                    style={styles.inputSmall}
                  />
                </div>
                <small style={styles.helperText}>
                  Effective Max: {calculateEffectiveMaxAP()}
                </small>
              </div>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Wounded Stage</label>
                <input
                  type="number"
                  value={character.trackers.woundedStage}
                  readOnly
                  style={styles.input}
                />
                <small style={styles.helperText}>
                  Auto-calculated from health
                </small>
              </div>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Armor</label>
                <input
                  type="number"
                  value={character.trackers.armor}
                  onChange={(e) => handleTrackerChange("armor", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Tempo</label>
                <input
                  type="number"
                  value={character.trackers.tempo}
                  onChange={(e) => handleTrackerChange("tempo", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Presence</label>
                <input
                  type="number"
                  value={character.trackers.presence}
                  onChange={(e) =>
                    handleTrackerChange("presence", e.target.value)
                  }
                  style={styles.input}
                />
              </div>
              <div style={styles.trackerItem}>
                <label style={styles.label}>Fame/Infamy</label>
                <input
                  type="number"
                  value={character.trackers.fameInfamy}
                  onChange={(e) =>
                    handleTrackerChange("fameInfamy", e.target.value)
                  }
                  style={styles.input}
                />
              </div>
            </div>
          </section>

          {/* Text Sections */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Character Details</h2>
            <div style={styles.textSections}>
              {Object.keys(character.textSections).map((section) => (
                <div key={section} style={styles.textSection}>
                  <label style={styles.label}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </label>
                  <textarea
                    value={character.textSections[section]}
                    onChange={(e) => handleTextChange(section, e.target.value)}
                    placeholder={`Enter ${section}...`}
                    rows="4"
                    style={styles.textarea}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Saved Characters */}
          {savedCharacters.length > 0 && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Saved Characters</h2>
              <div style={styles.savedCharacters}>
                {savedCharacters.map((char) => (
                  <div key={char.id} style={styles.savedCharacterCard}>
                    <div style={styles.savedCharacterInfo}>
                      <h3 style={styles.savedCharacterName}>
                        {char.name || "Unnamed Character"}
                      </h3>
                      <p style={styles.savedCharacterDetails}>
                        {char.species} {char.background}
                      </p>
                      <small style={styles.savedCharacterDate}>
                        Saved: {new Date(char.savedAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div style={styles.savedCharacterActions}>
                      <button
                        onClick={() => loadCharacter(char.id)}
                        style={{
                          ...styles.btn,
                          ...styles.btnPrimary,
                          ...styles.btnSm,
                        }}
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteCharacter(char.id)}
                        style={{
                          ...styles.btn,
                          ...styles.btnDanger,
                          ...styles.btnSm,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <PDFExporter
        ref={pdfExporterRef}
        character={character}
        calculateStamina={calculateStamina}
        calculateInitiative={calculateInitiative}
        calculateSpeed={calculateSpeed}
      />
    </>
  );
};

const styles = {
  container: {
    maxWidth: "1400px",
    width: "80vw",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#ffe974",
    color: "#000000",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    border: "2px solid #d53d22",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgba(213, 61, 34, 0.15)",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#000000",
    marginBottom: "15px",
    fontWeight: "700",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btn: {
    padding: "10px 20px",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  btnPrimary: {
    backgroundColor: "#d53d22",
    color: "#ffffff",
  },
  btnSecondary: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  btnSuccess: {
    backgroundColor: "#ffe974",
    color: "#000000",
    border: "2px solid #d53d22",
  },
  btnDanger: {
    backgroundColor: "#d53d22",
    color: "#ffffff",
  },
  btnSm: {
    padding: "6px 12px",
    fontSize: "12px",
  },
  btnControl: {
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(213, 61, 34, 0.1)",
    border: "2px solid #d53d22",
  },
  sectionTitle: {
    margin: "0 0 15px 0",
    fontSize: "20px",
    color: "#000000",
    borderBottom: "3px solid #ffe974",
    paddingBottom: "10px",
    fontWeight: "700",
  },
  sectionNote: {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "10px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#000000",
  },
  input: {
    padding: "8px",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  select: {
    padding: "8px",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  perksDisplay: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#ffe974",
    borderRadius: "4px",
    color: "#000000",
    border: "2px solid #d53d22",
    fontWeight: "600",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    backgroundColor: "#ffe974",
    borderRadius: "4px",
    border: "2px solid #d53d22",
  },
  statControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "8px",
  },
  statInput: {
    width: "60px",
    padding: "8px",
    textAlign: "center",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontWeight: "600",
  },
  modifier: {
    fontSize: "12px",
    color: "#d53d22",
    fontWeight: "bold",
  },
  costLabel: {
    fontSize: "11px",
    color: "#666666",
    marginTop: "5px",
  },
  pointsRemaining: {
    color: "#d53d22",
    fontSize: "16px",
    fontWeight: "700",
  },
  pointsNegative: {
    color: "#d53d22",
    fontSize: "16px",
    fontWeight: "700",
  },
  warning: {
    backgroundColor: "#ffe974",
    color: "#d53d22",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
    border: "2px solid #d53d22",
    fontWeight: "600",
  },
  derivedStats: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  derivedStat: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px",
    backgroundColor: "#ffe974",
    borderRadius: "4px",
    minWidth: "150px",
    border: "2px solid #d53d22",
  },
  derivedLabel: {
    fontWeight: "bold",
    color: "#000000",
  },
  derivedValue: {
    fontSize: "24px",
    color: "#d53d22",
    fontWeight: "bold",
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  skillItem: {
    padding: "10px",
    backgroundColor: "#ffe974",
    borderRadius: "4px",
    border: "2px solid #d53d22",
  },
  skillHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
    color: "#000000",
    fontWeight: "600",
  },
  skillControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
  skillValue: {
    fontSize: "20px",
    fontWeight: "bold",
    minWidth: "30px",
    textAlign: "center",
    color: "#000000",
  },
  trackersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  trackerItem: {
    display: "flex",
    flexDirection: "column",
  },
  trackerDual: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#000000",
    fontWeight: "600",
  },
  inputSmall: {
    padding: "8px",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    fontSize: "14px",
    flex: 1,
    backgroundColor: "#ffffff",
    color: "#000000",
    width: "100%",
  },
  helperText: {
    fontSize: "11px",
    color: "#666666",
    marginTop: "3px",
  },
  textSections: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    padding: "8px",
    border: "2px solid #d53d22",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: "90%",
  },
  savedCharacters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },
  savedCharacterCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#ffe974",
    borderRadius: "4px",
    border: "2px solid #d53d22",
  },
  savedCharacterInfo: {
    flex: 1,
  },
  savedCharacterName: {
    margin: "0 0 5px 0",
    fontSize: "18px",
    color: "#000000",
    fontWeight: "700",
  },
  savedCharacterDetails: {
    margin: "5px 0",
    fontSize: "14px",
    color: "#000000",
    fontWeight: "600",
  },
  savedCharacterDate: {
    fontSize: "12px",
    color: "#666666",
  },
  savedCharacterActions: {
    display: "flex",
    gap: "8px",
  },
};

export default CharacterBuilder;
