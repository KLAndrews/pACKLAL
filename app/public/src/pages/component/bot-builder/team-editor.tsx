import React, { ChangeEvent } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { Pkm, PkmIndex } from "../../../../../types/enum/Pokemon"
import ReactTooltip from "react-tooltip"
import CSS from "csstype"
import { IStep } from "../../../../../models/mongo-models/bot-v2"
import { getPortraitSrc } from "../../../utils"
import { useTranslation } from "react-i18next"

const tabStyle: CSS.Properties = {
  margin: "10px",
  marginTop: "0px",
  width: "60%",
  position: "absolute",
  top: "8.5%",
  left: "13%"
}

const cursorStyle: CSS.Properties = {
  cursor: "var(--cursor-hover)"
}

const tdStyle: CSS.Properties = {
  width: "80px",
  height: "80px",
  cursor: "var(--cursor-hover)",
  padding: "0px"
}

const divTdStyle: CSS.Properties = {
  display: "flex",
  justifyContent: "space-between",
  flexFlow: "column",
  width: "80px",
  height: "80px"
}

const bigImgStyle: CSS.Properties = {
  width: "80px",
  height: "80px",
  imageRendering: "pixelated",
  cursor: "var(--cursor-hover)"
}

const tabPaneStyle: CSS.Properties = {
  display: "flex",
  justifyContent: "center"
}

const labelStyle: CSS.Properties = {
  marginLeft: "10px"
}

const itemImgStyle: CSS.Properties = {
  height: "20px",
  width: "20px",
  position: "relative",
  bottom: "20px",
  borderRadius: "10px",
  border: "1px solid white",
  backgroundColor: "white"
}

export default function TeamEditor(props: {
  step: number
  steps: IStep[]
  avatar: string
  author: string
  name: string
  elo: number
  handleTabClick: (i: number) => void
  handleEditorClick: (x: number, y: number) => void
  handleAuthorChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleAvatarChange: (e: ChangeEvent<HTMLSelectElement>) => void
  handleRoundsRequiredChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleEloChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  const { t } = useTranslation()
  return (
    <div className="nes-container" style={tabStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p data-tip data-for={"help"}>
          {t("help")}
        </p>
        <ReactTooltip id={"help"} className="customeTheme">
          <p>{t("help_create_bot")}</p>
        </ReactTooltip>

        <div className="nes-field is-inline">
          <label style={labelStyle} htmlFor="default_select">
            {t("avatar")}
          </label>
          <div style={{ width: "auto" }} className="my-select">
            <select
              value={props.name}
              onChange={props.handleAvatarChange}
              id="default_select"
            >
              {Object.keys(Pkm)
                .sort((a, b) => {
                  return Pkm[a].localeCompare(Pkm[b])
                })
                .map((key) => {
                  return (
                    <option key={key} value={Pkm[key]}>
                      {Pkm[key]}
                    </option>
                  )
                })}
              ;
            </select>
          </div>
        </div>
        <div className="nes-field is-inline">
          <label style={labelStyle} htmlFor="inline_field">
            {t("author")}
          </label>
          <input
            onChange={props.handleAuthorChange}
            type="text"
            id="inline_field"
            className="nes-input"
            placeholder="Author Name"
            value={props.author}
          />
        </div>
        <div className="nes-field is-inline">
          <label style={labelStyle} htmlFor="inline_field">
            {t("elo")}
          </label>
          <input
            onChange={props.handleEloChange}
            type="number"
            className="nes-input"
            placeholder="Elo"
            value={props.elo}
          />
        </div>
      </div>

      <Tabs
        selectedIndex={props.step}
        onSelect={(i) => {
          props.handleTabClick(i)
        }}
      >
        <TabList>
          {props.steps.map((step, i) => {
            return (
              <Tab style={cursorStyle} key={i}>
                <p>{i}</p>
              </Tab>
            )
          })}
        </TabList>

        {props.steps.map((step, i) => {
          return (
            <TabPanel style={tabPaneStyle} key={i}>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginBottom: "10px"
                  }}
                >
                  <label
                    htmlFor="default_select"
                    data-tip
                    data-for={"step-" + i}
                  >
                    <ReactTooltip
                      id={"step-" + i}
                      className="customeTheme"
                      textColor="#000000"
                    >
                      <p>{t("points_required_hint")}</p>
                      <p>{t("next_step_hint")}</p>
                      <ul className="nes-list is-disc">
                        <li>{t("victory_step_hint")}</li>
                        <li>{t("defeat_step_hint")}</li>
                      </ul>
                      <p>{t("step_bot_hint")}</p>
                    </ReactTooltip>
                    {t("points_required")}: {props.steps[i].roundsRequired}
                  </label>
                  <p>{t("faster")}</p>
                  <div style={{ flexGrow: "0.4" }}>
                    <input
                      onChange={props.handleRoundsRequiredChange}
                      value={props.steps[i].roundsRequired}
                      type="range"
                      id="roundSlider"
                      name="roundSlider"
                      min="0"
                      max="5"
                      step="1"
                    />
                  </div>
                  <p>{t("slower")}</p>
                </div>
                <div
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <table className="nes-table is-bordered is-centered">
                    <tbody>
                      {[3, 2, 1].map((y) => {
                        return (
                          <tr key={y}>
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((x) => {
                              let r = (
                                <td
                                  style={tdStyle}
                                  onClick={() => {
                                    props.handleEditorClick(x, y)
                                  }}
                                  key={x}
                                ></td>
                              )
                              props.steps[i].board.forEach((p) => {
                                if (p.x == x && p.y == y) {
                                  r = (
                                    <td
                                      style={tdStyle}
                                      onClick={() => {
                                        props.handleEditorClick(x, y)
                                      }}
                                      key={x}
                                    >
                                      <div style={divTdStyle}>
                                        <img
                                          style={bigImgStyle}
                                          src={getPortraitSrc(
                                            PkmIndex[p.name],
                                            p.shiny,
                                            p.emotion
                                          )}
                                        ></img>
                                        {p.items ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-evenly"
                                            }}
                                          >
                                            {p.items.map((it, j) => {
                                              return (
                                                <img
                                                  key={j}
                                                  style={itemImgStyle}
                                                  src={
                                                    "assets/item/" + it + ".png"
                                                  }
                                                />
                                              )
                                            })}
                                          </div>
                                        ) : null}
                                      </div>
                                    </td>
                                  )
                                }
                              })
                              return r
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
          )
        })}
      </Tabs>
    </div>
  )
}
