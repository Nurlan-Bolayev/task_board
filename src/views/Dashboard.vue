<template>
  <div style="width:80%;" class="d-flex flex-column">
    <div
        style="margin-left:20px;margin-top:10px;margin-bottom: 20px;font-weight: bold;font-size: 30px;align-self: flex-start">
      Task
      board
    </div>
    <div style="display: grid;grid-template-columns: repeat(4, 400px);grid-column-gap: 10px ">
      <div @drop="drop($event)" @dragenter.prevent @dragend.prevent
           style="background-color: #f2f3f8;padding:10px;border-radius: 10px;padding: 10px">
        <div class="mt-7 d-flex align-center justify-space-around">
          <div>
            <span class="header">Unspecified tasks.</span>
            <span>{{ unspecified }}</span>
          </div>

          <div>
            <v-btn @click="openField = !openField" icon>
              <v-icon color="#6a91df">
                {{ !openField ? 'mdi-plus-circle' : 'mdi-minus-circle' }}
              </v-icon>
            </v-btn>
          </div>
        </div>
        <v-form class="d-flex justify-center flex-column mt-16" @submit.prevent="addTask" v-if="openField">
          <v-text-field
              style="border-radius: 10px"
              outlined
              placeholder="Description"
              v-model="taskBodyUnSpec.description"
              :error-messages="errors.description"
          />
          <v-text-field
              style="border-radius: 10px"
              outlined
              placeholder="Task body"
              v-model="taskBodyUnSpec.content"
              :error-messages="errors.content"
          />
          <v-btn :loading="isSubmittingTaskUnSpec" style="width: 90px;margin: 0 37%;border-radius: 8px" dark
                 type="submit"
                 color="green">Add Task
          </v-btn>
        </v-form>
        <div @click="isAddingTaskUnSpec = !isAddingTaskUnSpec"
             class="d-flex justify-center align-center ma-6 pa-4 add-task" v-if="unspecified === 0">
          {{ !isAddingTaskUnSpec ? '+ Add task' : 'Close' }}
        </div>
        <v-form class="d-flex justify-center flex-column" @submit.prevent="addTaskUnSpec" v-if="isAddingTaskUnSpec">
          <v-text-field
              style="border-radius: 10px"
              outlined
              placeholder="Description"
              v-model="taskBodyUnSpec.description"
              :error-messages="errors.description"
          />
          <v-text-field
              style="border-radius: 10px"
              outlined
              placeholder="Task body"
              v-model="taskBodyUnSpec.content"
              :error-messages="errors.content"
          />
          <v-btn :loading="isSubmittingTaskUnSpec" style="width: 90px;margin: 0 37%;border-radius: 8px" dark
                 type="submit"
                 color="green">Add Task
          </v-btn>
        </v-form>

        <div id="unspecified" draggable="true" @dragstart="drag($event,index)" class="task" v-for="(task,index) in tasks"
             :key="index">
          <div class="description" style="padding: 20px;">
            <span style="font-weight: bold;font-size: 17px;">{{ task.description }}</span>
            <div style="margin-top: 20px">
              <div>
                <v-icon>
                  mdi-file-document
                </v-icon>
                <span style="margin-left: 5px;">Description</span>
              </div>
            </div>
          </div>
          <div style="padding: 0 20px">
            {{ task.content.length > 45 ? trim(task.content) : task.content }}
          </div>
        </div>
      </div>
      <div style="background-color: #f2f3f8;padding:10px;border-radius: 10px;">
        <div class="d-flex justify-center align-center">
          <span>
          Has not started.
        </span>
        </div>
        <div class="d-flex justify-center flex-column mb-6">
          <div v-if="!notStarted.length" class="d-flex justify-center">
            <div @click="isAddingTask = !isAddingTask" class="d-flex justify-center align-center ma-6 pa-4 add-task">
              {{ !isAddingTask ? '+ Add task' : 'Close' }}
            </div>
          </div>
          <v-form class="d-flex justify-center flex-column" @submit.prevent="addTask" v-if="isAddingTask">
            <v-text-field
                style="border-radius: 10px"
                outlined
                placeholder="Description"
                v-model="taskBody.description"
                :error-messages="errors.description"
            />
            <v-text-field
                style="border-radius: 10px"
                outlined
                placeholder="Task body"
                v-model="taskBody.content"
                :error-messages="errors.content"
            />
            <v-btn :loading="isSubmittingTask" style="width: 90px;margin: 0 37%;border-radius: 8px" dark type="submit"
                   color="green">Add Task
            </v-btn>
          </v-form>
        </div>
        <div id="notStarted"
             style="width: 360px;height: 150px;border-radius: 10px;padding-top: 20px"
             @drop="drop($event)" @dragover.prevent @dragenter.prevent draggable="true" @drag="drag($event)">
        </div>
        <div v-for="(task,index) in notStarted" :key="index" @drop="drop($event)" @dragover.prevent
             @dragenter.prevent draggable="true" @drag="drag($event)">
          <div class="description" style="padding: 20px;">
            <span style="font-weight: bold;font-size: 17px;">{{ task.description }}</span>
            <div style="margin-top: 20px">
              <div>
                <v-icon>
                  mdi-file-document
                </v-icon>
                <span style="margin-left: 5px;">Description</span>
              </div>
            </div>
          </div>
          <div style="padding: 0 20px">
            {{ task.content.length > 45 ? trim(task.content) : task.content }}
          </div>
        </div>
      </div>
      <div id="processing" style="background-color: #f2f3f8;padding:10px;border-radius: 10px;">
        <div style="margin-bottom: 25px" class="d-flex justify-center align-center">
          <span>Processing</span>
        </div>
        <div style="width: 360px;height: 150px;border-radius: 10px;padding-top: 20px"
             @drop="drop($event)" @dragover.prevent @dragenter.prevent draggable="true" @drag="drag($event)"></div>
        <div v-for="(task,index) in processing" :key="index" @drop="drop($event)" @dragover.prevent
             @dragenter.prevent draggable="true" @drag="drag($event)">
          <div class="description" style="padding: 20px;">
            <span style="font-weight: bold;font-size: 17px;">{{ task.description }}</span>
            <div style="margin-top: 20px">
              <div>
                <v-icon>
                  mdi-file-document
                </v-icon>
                <span style="margin-left: 5px;">Description</span>
              </div>
            </div>
          </div>
          <div style="padding: 0 20px">
            {{ task.content.length > 45 ? trim(task.content) : task.content }}
          </div>
        </div>
      </div>
      <div id="completed" style="background-color: #f2f3f8;padding:10px;border-radius: 10px;">
        <div style="margin-bottom: 25px" class="d-flex justify-center align-center">
          <span>Completed</span>
        </div>

        <div style="width: 360px;height: 150px;border-radius: 10px" @drop="drop($event)"
             @dragover.prevent @dragenter.prevent draggable="true" @drag="drag($event)"></div>
        <div v-for="(task,index) in processing" :key="index" @drop="drop($event);" @dragover.prevent
             @dragenter.prevent draggable="true" @drag="drag($event)">
          <div class="description" style="padding: 20px;">
            <span style="font-weight: bold;font-size: 17px;">{{ task.description }}</span>
            <div style="margin-top: 20px">
              <div>
                <v-icon>
                  mdi-file-document
                </v-icon>
                <span style="margin-left: 5px;">Description</span>
              </div>
            </div>
          </div>
          <div style="padding: 0 20px">
            {{ task.content.length > 45 ? trim(task.content) : task.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  // async beforeRouteEnter(from, to, next) {
  //   await this.$store.dispatch('fetchUser').catch(() => {
  //   })
  //   if (this.$store.state.user) {
  //     next()
  //   } else {
  //     next('/');
  //   }
  // },
  data() {
    return {
      tasks: [],
      taskClosed: true,
      openField: false,
      isAddingTask: false,
      isSubmittingTaskUnSpec: false,
      isFetchingTasks: false,
      isAddingTaskUnSpec: false,
      taskBodyUnSpec: {
        description: '',
        content: ''
      },
      taskBody: {
        description: '',
        content: '',
      },
      notStarted: [],
      processing: [],
      completed: [],
      isSubmittingTask: false,
      errors: {},
      dropped: false,
      dragging: false
    }
  }
  ,
  computed: {
    unspecified() {
      return this.tasks.length;
    }
  }
  ,
  methods: {
    trim(content) {
      return content.substr(0, content.indexOf('.') + 1);
    }
    ,
    openTask(e) {
      console.log(e.target);
    }
    ,
    drag(e) {
      e.target.style.border = !this.dropped ? 'dotted' : '';
      e.dataTransfer.setData('text/plain', e.target.id);
      console.log(e.target.id);

    }
    ,
    drop(e) {
      e.preventDefault();
      // console.log(e.target);
      const data = e.dataTransfer.getData("text/plain");
      let id = e.target.parentElement.id;
      this.dropped = true;
      let elem = document.getElementById(data);
      e.target.parentNode.appendChild(document.getElementById(data));
      id === 'completed' ? this.completed.push(elem) : (id === 'processing' ? this.processing.push(elem) : this.notStarted.push(elem))
      elem.id = e.target.id;
      let desc = elem.querySelector('span').innerText;
      const taskdesc = this.tasks.filter(task => task.description === desc);
      this.editTaskState(taskdesc[0].id, id);
      console.log(this.notStarted.length);
    }
    ,
    async editTaskState(id, state) {
      const {data} = await axios.post(`api/tasks/${id}`, {state: state})
      console.log(data);
    }
    ,
    async addTask() {
      try {
        this.isSubmittingTask = true;
        const {data} = axios.post(`api/${this.$store.state.user.id}/task`, Object.assign(this.taskBody, {
          owner_id: this.$store.state.user.id,
          state: 'NotStarted'
        }))
        console.log(data);
        this.errors = {};
        this.taskBody = {}
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.allTasks();
        this.isSubmittingTask = false;
      }
    }
    ,
    async addTaskUnSpec() {
      try {
        this.isSubmittingTaskUnSpec = true;
        const {data} = axios.post(`api/${this.$store.state.user.id}/task`, Object.assign(this.taskBodyUnSpec, {
          owner_id: this.$store.state.user.id,
          state: 'NotStarted'
        }))
        console.log(data);
        this.errors = {};
        this.taskBodyUnSpec = {}
      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.allTasks();
        this.isSubmittingTaskUnSpec = false;
      }
    }
    ,
    async allTasks() {
      try {
        this.isFetchingTasks = true;
        const {data} = await axios.get(`api/${this.$store.state.user.id}/tasks`);
        this.tasks = data;
      } catch {
        //
      } finally {
        this.isFetchingTasks = false;
      }
    }
  }
  ,
  async mounted() {
    console.log(this.$store.state.user);
    const {data} = await axios.get(`api/${this.$store.state.user.id}/tasks`);
    this.tasks = data;
    console.log('mounted');
    console.log(this.tasks);
    console.log(data);
  }
}
</script>

<style scoped>
.main {
  width: 100vw;
}

.add-task {
  background-color: #d9dde6;
  border-radius: 10px;
  width: 60%;
}

.add-task:hover {
  cursor: pointer;
}

.task {
  background-color: #fff;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
}

.description {
}
</style>