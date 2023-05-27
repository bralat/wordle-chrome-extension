import { customElement } from "../decorators";
import BaseElement from './BaseElement';

@customElement('start-button') 
export default class StartButtonElement extends BaseElement
{
  constructor () {
    super()
    this.render()
  }

  render () {
    
    const button: HTMLButtonElement = document.createElement('button')
    button.innerHTML = this.icon

    const style: HTMLStyleElement = document.createElement('style')
    style.innerHTML = `
      button{
        width: 45px;
        height: 45px;
        border-radius: 25px;
        border-width: 0px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.1);
      }

      button svg {
        margin-left: -5px;
        margin-top: 4px;
      }

      button:hover {
        background-color: rgba(255, 255, 255, 0.7);
      }
    `

    this.shadow.appendChild(style)
    this.shadow.appendChild(button)
  }

  get icon(): string {
    // Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools
    return `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="40px" height="25px" fill="#000000">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
          <path style="fill:#576D7E;" d="M278.43,512H233.57c-6.168,0-11.8-3.495-14.547-9.021l-11.784-23.487h97.524l-11.784,23.487 C290.231,508.505,284.599,512,278.43,512z"></path> 
          <path style="fill:#C9D5DD;" d="M190.984,365.714h130.032c4.486,0,8.127,3.641,8.127,8.127v89.397c0,8.98-7.274,16.254-16.254,16.254 H199.111c-8.98,0-16.254-7.274-16.254-16.254v-89.397C182.857,369.355,186.498,365.714,190.984,365.714z"></path> <path style="fill:#FCD063;" d="M256,0c-85.252,0-154.413,60.952-154.413,146.286c0.431,47.738,17.701,93.785,48.762,130.032 c15.523,19.017,40.635,57.458,40.635,89.397h130.032c0-31.939,25.112-70.38,40.635-89.397 c31.061-36.246,48.331-82.294,48.762-130.032C410.413,60.952,341.252,0,256,0z"></path> <path style="fill:#F6B545;" d="M321.016,365.714H190.984c0-8.98,7.274-16.254,16.254-16.254h99.068 c7.152-38.116,36.571-75.825,42.667-83.383c25.21-29.249,40.741-65.593,44.455-104.025c0.683-8.883,8.078-15.75,16.985-15.766l0,0 c-0.203,47.779-17.497,93.899-48.762,130.032c-6.014,7.396-36.328,46.243-40.635,82.164V365.714z"></path> <g> <path style="fill:#FFE27A;" d="M148.155,105.651c-4.486,0.065-8.176-3.527-8.241-8.013c-0.024-1.463,0.358-2.909,1.089-4.177 C163.58,50.916,207.831,24.332,256,24.381c4.486,0,8.127,3.641,8.127,8.127s-3.641,8.127-8.127,8.127 c-42.285,0.033-81.059,23.503-100.693,60.952C153.836,104.139,151.097,105.691,148.155,105.651z"></path> <path style="fill:#FFE27A;" d="M134.095,162.54c-4.486,0-8.127-3.641-8.127-8.127c0-8.737,0.87-17.449,2.601-26.006 c0.894-4.486,5.266-7.396,9.752-6.502c4.486,0.894,7.396,5.266,6.502,9.752c-1.625,7.477-2.495,15.1-2.601,22.756 C142.222,158.899,138.581,162.54,134.095,162.54z"></path> </g> <path style="fill:#ECF0F9;" d="M304.762,146.286c-17.953,0-32.508,14.555-32.508,32.508v16.254h-24.381v-16.254 c0-17.952-14.555-32.508-32.508-32.508s-32.508,14.555-32.508,32.508s14.555,32.508,32.508,32.508h16.254V349.46h16.254V211.302 h24.381V349.46h16.254V211.302h16.254c17.952,0,32.508-14.555,32.508-32.508S322.714,146.286,304.762,146.286z M215.365,195.048 c-8.98,0-16.254-7.274-16.254-16.254s7.274-16.254,16.254-16.254s16.254,7.274,16.254,16.254v16.254H215.365z M304.762,195.048 h-16.254v-16.254c0-8.98,7.274-16.254,16.254-16.254s16.254,7.274,16.254,16.254S313.742,195.048,304.762,195.048z"></path> <g> <rect x="231.619" y="349.46" style="fill:#C9D5E3;" width="16.254" height="16.254"></rect> <rect x="272.254" y="349.46" style="fill:#C9D5E3;" width="16.254" height="16.254"></rect> </g> <g> <path style="fill:#B2C4D0;" d="M296.635,463.238H182.857l0,0v-16.254l0,0h97.524C289.361,446.984,296.635,454.258,296.635,463.238 L296.635,463.238L296.635,463.238z"></path> <path style="fill:#B2C4D0;" d="M231.619,381.968h97.524l0,0v16.254l0,0H215.365l0,0l0,0 C215.365,389.242,222.639,381.968,231.619,381.968z"></path> <rect x="182.857" y="414.476" style="fill:#B2C4D0;" width="146.286" height="16.254"></rect> </g> <polygon style="fill:#35495C;" points="296.635,495.746 304.762,479.492 207.238,479.492 215.365,495.746 "></polygon> 
        </g>
      </svg>
    `
  }
}
