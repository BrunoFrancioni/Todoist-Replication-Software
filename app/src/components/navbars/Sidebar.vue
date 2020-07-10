<template>
  <b-col class="row bg-sidebar mr-1" cols="6" md="4">
    <ul class="nav nav-pills flex-column pl-3 pt-2">
      <li class="nav-item form-inline" @click="setActiveInbox()">
        <i class="fas fa-inbox"></i>
        <router-link 
          to="/inbox" 
          class="nav-link text-dark"
          :class="{'font-weight-bold': inboxActive}"
        >Inbox</router-link>
      </li>
      <li class="nav-item form-inline" @click="setActiveToday()">
        <i class="fas fa-calendar-day"></i>
        <router-link 
          to="/" 
          class="nav-link text-dark"
          :class="{'font-weight-bold': todayActive}"
        >Today</router-link>
      </li>
      <li class="nav-item form-inline mb-2" @click="setActiveUpcoming()">
        <i class="far fa-calendar-alt"></i>
        <router-link 
          to="/upcoming" 
          class="nav-link text-dark"
          :class="{'font-weight-bold': upcomingActive}"
        >Upcoming</router-link>
      </li>

      <li class="nav-item form-inline mb-1">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Projects</span>
      </li>

      <div class="ml-3 mb-3">
        <li v-if="projects.length === 0">
          <p>No projects yet !</p>
        </li>

        <li v-else v-for="(project, index) in projects" :key="index">
          <router-link
            :to="{ name: 'Project', params: { idproject: project.idproject, title: project.title } }"
            class="nav-link text-dark"
            @click="resetTasks"
            replace
          >{{ project.title }}</router-link>
        </li>

        <li>
          <b-link 
            class="text-secondary" 
            @click="showCreateProjectModal = true"
          ><i class="fas fa-plus"></i> <span>Add project</span></b-link>
        </li>
      </div>

      <li class="nav-item form-inline">
        <i class="fas fa-sort-amount-down"></i>
        <span class="nav-link text-dark font-weight-bold">Labels</span>
      </li>

      <div class="ml-3">
        <li v-if="labels.length === 0">
          <p>No labels yet !</p>
        </li>

        <li v-else v-for="(label, index) in labels" :key="index">
          <b-row>
            <b-col>
              <p>{{ label.tagname }}</p>
            </b-col>
            
            <b-col align-v="end">
              <i 
              class="fas fa-pencil-alt cursor" 
              @click="showEditTag(label)" 
              v-b-tooltip.hover title="Edit tag"
              ></i>
              <i 
                class="fas fa-trash-alt ml-3 cursor"
                @click="deleteTag(label.idtag)"
                v-b-tooltip.hover title="Delete label"
              ></i>
            </b-col>
          </b-row>
        </li>

        <li>
          <b-link 
            class="text-secondary"
            @click="showCreateTagModal = true"
          ><i class="fas fa-plus"></i> <span>Add label</span></b-link>
        </li>
      </div>
    </ul>

    <b-modal
      v-model="showCreateProjectModal"
      size="lg"
      title="Create Project"
      @hidden="resetProjectModal"
    >
      <div>
        <b-form @submit="submitProject" @reset="resetProjectModal">
          <b-form-group
            id="input-group-1"
            label="Project title:"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="createProject.title"
              type="text"
              required
              placeholder="Enter project title"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
            <b-button type="submit" variant="primary">Create project</b-button>
          </b-form-group>
          
        </b-form>
      </div>

      <template v-slot:modal-footer>
        <b-button variant="" @click="showCreateProjectModal = false">Close</b-button>
      </template>
    </b-modal>

    <b-modal
      v-model="showCreateTagModal"
      size="lg"
      title="Create Label"
      @hidden="resetTagModal"
    >
      <div>
        <b-form @submit="submitTag" @reset="resetTagModal">
          <b-form-group
            id="input-group-1"
            label="Label title:"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="createTag.tagname"
              type="text"
              required
              placeholder="Enter label name"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button type="reset" variant="danger" class="mr-2">Reset</b-button>
            <b-button type="submit" variant="primary">Create label</b-button>
          </b-form-group>
          
        </b-form>
      </div>

      <template v-slot:modal-footer>
        <b-button variant="" @click="showCreateTagModal = false">Close</b-button>
      </template>
    </b-modal>

    <b-modal
      v-model="showEditTagModal"
      size="lg"
      title="Edit Label"
      @hidden="resetEditTagModal"
    >
      <div>
        <b-form @submit="submitTagEdited" @reset="resetEditTagModal">
          <b-form-group
            id="input-group-1"
            label="Label title:"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="editTag.tagname"
              type="text"
              required
              placeholder="Enter label name"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button type="submit" variant="primary">Save label</b-button>
          </b-form-group>
          
        </b-form>
      </div>

      <template v-slot:modal-footer>
        <b-button variant="" @click="showEditTagModal = false">Close</b-button>
      </template>
    </b-modal>
  </b-col>
</template>

<script>
import projectServices from '../../_services/project-services'
import tagsServices from '../../_services/tags-services'

export default {
  name: 'Sidebar',
  data: () => {
    return {
      inboxActive: false,
      todayActive: false,
      upcomingActive: false,
      projects: [],
      labels: [],
      showCreateProjectModal: false,
      createProject: {
        title: ''
      },
      showCreateTagModal: false,
      createTag: {
        tagname: ''
      },
      showEditTagModal: false,
      editTag: {
        idtag: null,
        tagname: null
      }
    }
  },
  created() {
    this.setActiveToday();
    this.getProjects();
    this.getLabels();
  },
  methods: {
    setActiveInbox() {
      this.inboxActive = true;
      this.todayActive = false;
      this.upcomingActive = false;
    },
    setActiveToday() {
      this.inboxActive = false;
      this.todayActive = true;
      this.upcomingActive = false;
    },
    setActiveUpcoming() {
      this.inboxActive = false;
      this.todayActive = false;
      this.upcomingActive = true;
    },
    async getProjects() {
      const result = await projectServices.GetProjects(this.$parent.userInfo.iduser);
      console.log(result);
      if(result.status === 200) {
        this.projects = result.data.projects;
        this.$parent.getProjects();
      }
    },
    async getLabels() {
      const result = await tagsServices.GetTags(this.$parent.userInfo.iduser);
      console.log(result);

      if(result.status === 200) {
        this.labels = result.data.tags;
        this.$parent.getTags();
      }
    },
    resetProjectModal() {
      this.createProject = {
        title: ''
      }
    },
    resetTagModal() {
      this.createTag = {
        tagname: ''
      }
    },
    async submitProject(evt) {
      evt.preventDefault();
      this.createProject.iduser = this.$parent.userInfo.iduser;

      const result = await projectServices.CreateProject(this.createProject);

      if(result.status !== 201) {
        console.log(result);

        this.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });
      } else {
        this.$parent.Toast.fire({
          icon: 'success',
          title: 'Project created succesfully'
        });

        this.getProjects();
        this.showCreateProjectModal = false;
        this.resetProjectModal();
        this.$parent.getProjects()  ;
      }
    },
    async submitTag(evt) {
      evt.preventDefault();
      this.createTag.iduser = this.$parent.userInfo.iduser;

      const result = await tagsServices.CreateTag(this.createTag);

      if(result.status !== 201) {
        console.log(result);

        this.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });
      } else {
        this.$parent.Toast.fire({
          icon: 'success',
          title: 'Label created succesfully'
        });

        this.getLabels();
        this.showCreateTagModal = false;
        this.resetTagModal();
        this.$parent.getTags();
      }
    },
    resetTasks() {
      this.$parent.resetTasks();
    },
    resetEditTagModal() {
      this.editTag = {
        idtag: null,
        tagname: null
      }

      this.showEditTagModal = false;
    },
    showEditTag(label) {
      this.editTag.idtag = label.idtag;
      this.editTag.tagname = label.tagname;

      this.showEditTagModal = true;
    },
    async submitTagEdited(evt) {
      evt.preventDefault();

      const result = await tagsServices.EditTag(this.editTag.idtag, { tagname: this.editTag.tagname });

      if(result.status !== 200) {
        this.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });

        this.resetEditTagModal();
      } else {
        this.$parent.Toast.fire({
          icon: 'success',
          title: 'Label edited succesfully'
        });

        this.getLabels();
        this.$parent.getTags();
        this.$parent.resetTasks();

        this.resetEditTagModal();
      }
    },
    async deleteTag(idtag) {
      const result = await tagsServices.DeleteTag(idtag);

      if(result.status !== 200) {
        this.$parent.Toast.fire({
          icon: 'error',
          title: 'An error has occurred'
        });
      } else {
        this.$parent.Toast.fire({
          icon: 'success',
          title: 'Label deleted succesfully'
        });

        this.getLabels();
        this.$parent.resetTasks();
        this.$parent.getTags();
      }
    }
  }
}
</script>

<style>
.bg-sidebar {
  background-color: #fafafa;
  max-width: 60%;
  min-height: 100vh;
}
</style>